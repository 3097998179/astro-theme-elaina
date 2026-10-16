---
title: Lsky Pro 图床搭建与问题排查
published: 2026-10-16
description: 从 Docker 部署到初始化安装，再到存储策略配置与常见问题排查，完整记录 Lsky Pro 图床的搭建过程。
image: ./images/index7.avif
tags: [Lsky, 图床, Docker, 博客, 教程]
category: 旅途手札
slug: lsky-pro-guide
series: "技术笔记与踩坑总结"
seriesOrder: 3
---

## 一、简介

Lsky Pro（兰空图床）是一款开源免费的在线图片管理程序，基于 PHP 开发，支持将图片上传至本地磁盘、对象存储等多种后端，并自动生成可外链的图片地址。适合个人博客、文档或应用搭建私有图床，数据自主可控。

> [!WARNING] 版本状态
> Lsky Pro 开源版已停止维护，不再更新新功能和修复 bug。官方目前主推商业版 Lsky Pro+。开源版现有功能完整，仍可正常使用。

## 二、环境准备

本文使用 Docker 部署，这是目前最简单的方式。Docker 版内置了 Web 服务器和图片处理库，并预先配置好消息队列与计划任务，无需手动设置。

开始之前，确认两件事：

1. 服务器已安装 Docker
2. 服务器可通过内网或公网访问

## 三、创建数据目录

Docker 容器删除或重建后，里面的数据会丢失。需要把数据目录挂载到宿主机，确保数据持久化。

执行以下命令创建数据目录：

```bash
mkdir -p ~/data
```

> [!IMPORTANT] 关于 .env 文件
> 首次运行会在该目录下生成 `.env` 文件。请确保该目录初始为空，否则安装程序可能无法正确写入配置。后续如需修改配置，可直接编辑 `~/data/.env`。

## 四、Docker 部署

### 4.1 单容器运行

使用社区维护的 Docker 镜像启动 Lsky Pro：

```bash title="Docker 单容器运行"
docker run -d --name lsky-pro \
  -p 8000:8000 \
  -v ~/data:/app/storage/app \
  -v ~/data/themes:/app/themes \
  0xxb/lsky-pro:latest
```

参数说明：

| 参数 | 作用 |
| :--- | :--- |
| `-d` | 后台运行 |
| `--name lsky-pro` | 容器名称 |
| `-p 8000:8000` | 端口映射。左侧为宿主机端口，可按需修改 |
| `-v ~/data:/app/storage/app` | 挂载存储目录，保存上传的图片和缓存 |
| `-v ~/data/themes:/app/themes` | 挂载主题目录，方便更换主题 |
| `0xxb/lsky-pro:latest` | 使用的镜像 |

> [!TIP] 端口修改
> 如果宿主机 8000 端口已被占用，可将左侧数字改为其他端口，例如 `-p 8080:8000`。

### 4.2 Docker Compose 部署（含 MySQL）

如需使用 MySQL 数据库，创建 `docker-compose.yml`：

```yaml title="docker-compose.yml"
version: '3'
services:
  lskypro:
    image: halcyonazure/lsky-pro-docker:latest
    restart: unless-stopped
    container_name: lskypro
    environment:
      - WEB_PORT=8089
    volumes:
      - $PWD/web:/var/www/html
    ports:
      - "9080:8089"
    networks:
      - lsky-net
    depends_on:
      - mysql-lsky

  mysql-lsky:
    image: mysql:5.7.22
    restart: unless-stopped
    container_name: mysql-lsky
    command: --default-authentication-plugin=mysql_native_password
    volumes:
      - $PWD/mysql/data:/var/lib/mysql
      - $PWD/mysql/conf:/etc/mysql
      - $PWD/mysql/log:/var/log/mysql
    environment:
      MYSQL_ROOT_PASSWORD: 自定义密码
      MYSQL_DATABASE: lsky-data
    networks:
      - lsky-net

networks:
  lsky-net: {}
```

启动服务：

```bash
docker compose up -d
```

> [!NOTE] 记得改密码
> 把 `MYSQL_ROOT_PASSWORD` 后面的「自定义密码」换成自己的密码。

## 五、初始化安装

### 5.1 打开安装页面

容器启动后，浏览器访问：

```text
http://服务器IP:8000
```

首次访问会自动跳转到安装引导页面。

### 5.2 检测运行环境

页面会先检查服务器环境是否满足运行条件。确认无异常后，点击下一步。

![环境检测](./images/index7(1).avif)

### 5.3 选择数据库并输入管理员账号

选择数据库类型：

- **个人使用**：选 SQLite，无需额外安装数据库，最省事
- **多人使用或数据量大**：选 MySQL，需填写数据库地址、用户名、密码等信息

同时设置管理员邮箱和密码。这个账号用于登录后台，密码需妥善保管。

![选择数据库并输入账号](./images/index7(2).avif)

### 5.4 安装完成

填写完成后点击「立即安装」。安装成功后会显示完成页面。

![安装完成](./images/index7(3).avif)

之后使用刚才创建的账号登录后台即可。

## 六、存储策略配置

存储策略决定图片存在哪里。进入后台「存储策略」页面，可以创建和管理不同的存储后端。

| 存储类型 | 说明 | 适合场景 |
| :--- | :--- | :--- |
| 本地存储 | 存在服务器磁盘 | 初期使用，最简单 |
| AWS S3 | 兼容 S3 协议的对象存储 | 长期使用，扩展性强 |
| 阿里云 OSS | 阿里云对象存储 | 国内用户，稳定 |
| 腾讯云 COS | 腾讯云对象存储 | 国内用户，速度快 |
| 七牛云 | 老牌对象存储 | 国内用户 |
| 又拍云 | 国内 CDN 与存储 | 国内用户 |
| MinIO | 自建 S3 兼容存储 | 有自建存储需求 |
| SFTP / FTP | 传统文件传输 | 已有 FTP 服务器 |
| WebDAV | 支持 WebDAV 协议 | 已有 WebDAV 服务 |

本地存储适合初期使用，配置简单。对象存储适合长期使用，可节省服务器磁盘空间，并通过 CDN 加速图片加载。

创建存储策略时，第一栏的「角色组」用于控制哪些用户可以使用该策略。单击可选择，Windows 按住 Ctrl 可多选。

## 七、常见问题

### 7.1 上传文件大小超限

修改 PHP 的 `upload_max_filesize` 和 `post_max_size` 参数。同时检查 Nginx 的 `client_max_body_size` 设置：

```nginx
client_max_body_size 50m;
```

修改后重启容器和 Nginx。

### 7.2 上传大图提示 413

Nginx 限制了请求体大小。在 Nginx 配置中添加 `client_max_body_size`，并确保 PHP 上传参数足够大。

### 7.3 目录权限导致上传失败或 500 错误

这是最常见的问题。确保程序目录的用户组和所有者正确。宝塔面板环境下通常为 `www`：

```bash
chown -R www:www /path/to/lsky
chmod -R 755 /path/to/lsky
```

### 7.4 图片无法显示

检查是否开启了防盗链，以及当前域名是否在白名单中。后台设置中可查看和修改。

### 7.5 迁移服务器后上传失败

检查新环境是否安装了 `fileinfo` 扩展。这是 Lsky Pro 的必需扩展。

### 7.6 第三方存储上传失败

通常是配置信息有误或存储账号权限不足。检查 AccessKey、SecretKey、Bucket 名称和区域设置是否正确。

### 7.7 在线更新失败

服务器可能无法访问 `api.lsky.pro` 或 GitHub。可手动下载安装包进行离线升级。

### 7.8 开启鉴黄后上传变慢

鉴黄接口服务器在国外，图片需先上传到你的服务器再被抓取检测，会增加耗时。对速度要求高的话，可以不开启鉴黄。

### 7.9 页面加载缓慢

浏览器按 F12 打开控制台，查看是否有对 `fonts.googleapis.com` 等外部资源的请求超时。如有，可替换为国内 CDN 或禁用外部字体。

### 7.10 错误对照表

| 现象 | 可能原因 | 解决办法 |
| :--- | :--- | :--- |
| 上传失败 | 目录权限不对 | 检查挂载目录权限，确保容器可写 |
| 500 错误 | 存储策略配置错误 | 检查存储驱动的连接信息 |
| 图片无法显示 | 防盗链拦截 | 检查防盗链白名单设置 |
| 上传大图失败 | Nginx 或 PHP 限制 | 调整 `client_max_body_size` 和 PHP 上传参数 |
| 在线更新失败 | 服务器无法访问更新源 | 手动下载安装包离线升级 |
| 加载缓慢 | 外部字体请求超时 | 替换或禁用 Google Fonts |

—— 殇恋