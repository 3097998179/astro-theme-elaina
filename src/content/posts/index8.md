---
title: OpenAList 搭建与使用指南
published: 2026-10-18
description: 从 Docker 部署到初始化配置、WebDAV 挂载、离线下载、反向代理优化与常见问题排查，完整记录 OpenAList 的搭建与使用过程。
image: ./images/index8.avif
tags: [OpenAList, AList, Docker, 网盘, 教程]
category: 旅途手札
slug: openalist-guide
series: "技术笔记与踩坑总结"
seriesOrder: 4
---

# OpenAList 搭建与使用指南

## 一、OpenAList 简介

OpenAList 是一个由社区独立维护的分叉项目，基于 AList v3.45.0 构建，旨在提供一个更安全、可持续的开源网盘聚合工具。它可以聚合超过 60 种云盘、对象存储和本地存储，并通过 WebDAV、FTP、SFTP 等协议统一访问。

相较于原版 AList，OpenAList 在安全性上做了多项加固，包括修复路径遍历、XSS、SSRF、TLS 配置等漏洞，并移除了不安全的 API。社区团队持续维护存储驱动的兼容性，发布多平台二进制文件和 Docker 镜像。

> [!NOTE] 版本说明
> OpenAList 基于 AList v3.45.0 构建。原版 AList 被收购后，社区担忧代码透明度下降和潜在隐私风险，因此分叉出 OpenAList。如果此前使用过 AList，迁移成本较低。

## 二、环境准备

推荐使用 Docker 部署，这是最便捷的方式。开始之前，确认服务器已安装 Docker，并可通过内网或公网访问。

## 三、Docker 部署

### 3.1 单容器运行

执行以下命令启动 OpenAList：

```bash title="Docker 单容器运行"
docker run -d \
  --name alist \
  --restart unless-stopped \
  -p 5244:5244 \
  -v /path/to/data:/opt/alist/data \
  alliot/alist:latest
```

参数说明：

| 参数 | 作用 |
| :--- | :--- |
| `-d` | 后台运行 |
| `--name alist` | 容器名称 |
| `--restart unless-stopped` | 服务器重启后自动启动 |
| `-p 5244:5244` | 端口映射，左侧为宿主机端口，可按需修改 |
| `-v /path/to/data:/opt/alist/data` | 挂载数据目录，保存配置和文件 |
| `alliot/alist:latest` | 使用的镜像 |

> [!TIP] 端口修改
> 如果宿主机 5244 端口已被占用，可将左侧数字改为其他端口，例如 `-p 5245:5244`。

### 3.2 镜像变体说明

OpenAList 提供了多种镜像变体，可按需选择：

| 镜像标签 | 包含组件 |
| :--- | :--- |
| `latest` / `vX.Y.Z` | 仅 OpenAList |
| `latest-ffmpeg` / `vX.Y.Z-ffmpeg` | OpenAList + FFmpeg |
| `latest-aria2` / `vX.Y.Z-aria2` | OpenAList + aria2 |
| `latest-aio` / `vX.Y.Z-aio` | OpenAList + FFmpeg + aria2 |

如果需要视频转码或离线下载功能，可选择对应的变体镜像。

### 3.3 Docker Compose 部署

创建 `docker-compose.yml` 文件：

```yaml title="docker-compose.yml"
services:
  openlist:
    image: 'openlistteam/openlist:latest'
    container_name: openlist
    restart: unless-stopped
    ports:
      - "5244:5244"
    volumes:
      - ./openlist/data:/opt/openlist/data
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
```

启动服务：

```bash
docker compose up -d
```

## 四、初始化配置

### 4.1 获取初始密码

首次启动后，OpenAList 会生成一个随机管理员密码，并输出在容器日志中：

```bash
docker logs alist
```

在日志中查找类似 `initial admin password: xxxxxxxx` 的信息。

### 4.2 预设管理员密码

也可以在创建数据目录之前，通过环境变量预设初始密码：

```bash title="预设管理员密码"
docker run -d \
  --name alist \
  --restart unless-stopped \
  -p 5244:5244 \
  -e ALIST_ADMIN_PASSWORD='你的强密码' \
  -v /path/to/data:/opt/alist/data \
  alliot/alist:latest
```

### 4.3 重置管理员密码

如果忘记了密码，可以进入容器执行重置命令：

```bash title="重置管理员密码"
docker exec -it alist ./alist admin set '新的强密码'
```

也可以随机生成一个新密码：

```bash
docker exec -it alist ./alist admin random
```

### 4.4 登录后台

访问 `http://服务器IP:5244`，使用账号 `admin` 和刚才获取的密码登录。

![登录页面](./images/index8(1).avif)

> [!NOTE] 首次登录后
> 建议立即在后台「个人设置」中修改密码，并配置二次验证（如有需要）。

## 五、添加存储

登录后台后，进入「存储」页面，点击「添加」来挂载存储。

### 5.1 本地存储

选择驱动类型为「本机存储」，填写挂载路径。挂载路径可在 Docker 配置中查看，例如 `/opt/alist/data`。

### 5.2 云盘挂载

OpenAList 支持阿里云盘、百度网盘、OneDrive、夸克、WebDAV 等 60 多种存储驱动。每种驱动的配置方式不同，通常需要获取对应的 Token 或授权信息。

> [!TIP] 安全建议
> 获取云盘 Token 时，建议使用本地或离线工具，避免使用不受信任的在线服务。

### 5.3 存储路径建议

挂载云盘时，建议选择非根目录的路径（如 `/网盘名称`），方便管理。挂载完成后，可以在 OpenAList 主界面看到聚合后的文件列表。

## 六、WebDAV 挂载

OpenAList 支持 WebDAV 协议，可以把聚合后的网盘挂载到本地电脑或手机上，像访问本地文件夹一样使用网盘文件。

**挂载地址格式**为 `http://你的域名:端口/dav`。部分客户端（如 RaiDrive）只需要在路径处填写 `dav` 即可。

在 Windows 上可以通过「映射网络驱动器」挂载，macOS 用 Finder 的「连接服务器」，手机端可以用 Documents、nPlayer 等支持 WebDAV 的应用。如果需要 HTTPS，在客户端中勾选 SSL 选项即可。

## 七、离线下载

OpenAList 支持通过 Aria2 实现离线下载，把互联网文件直接下载到挂载的网盘中，无需本地中转。

**配置步骤**：进入后台「设置」→「其他」，配置 Aria2 的 RPC 地址和密钥。然后在前台点击离线下载按钮，输入 URL 或种子链接，选择目标存储位置即可开始下载。

如果不想手动配置，可以使用集成了 Aria2、qBittorrent 和 Caddy 反向代理的 Openlist-EX-container 镜像，一键部署即可使用离线下载、BT/PT 下载和自动 HTTPS。Aria2 的 RPC 地址通常为 `http://localhost:61601/jsonrpc`，qBittorrent 的 WebUI 默认为 `http://<用户名>:<密码>@localhost:61602/`。

需要注意的是，部分存储服务（如阿里云盘）需要开通会员才能使用离线下载功能。

## 八、反向代理优化

如果通过 Nginx 反向代理访问 OpenAList，默认配置可能导致大文件上传失败或页面缓存问题。以下配置针对大文件场景做了优化：

```nginx title="Nginx 反向代理优化配置"
location / {
    proxy_pass http://127.0.0.1:5244;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    # 彻底关闭缓存，避免 listing 刷新不出来
    add_header Cache-Control no-cache;
    proxy_cache off;
    expires off;

    # 上传大文件必备，避免 Nginx 缓存文件占满硬盘
    proxy_request_buffering off;

    # 防止传输中断，适合 50G 以上文件上传
    proxy_connect_timeout 21600s;
    proxy_read_timeout 21600s;
    proxy_send_timeout 21600s;
}
```

同时需要在 `proxy.conf` 中删除 `proxy_cache cache_one;` 这一行，并加上 `proxy_max_temp_file_size 0;`。宝塔面板中还需要将 `client_max_body_size` 改为 `0`，并删除默认的静态资源缓存规则。

## 九、安全加固

### 9.1 修改默认密码

首次登录后立即修改 `admin` 账号的密码，使用强密码。

### 9.2 配置防盗链和访问控制

在后台「设置」中配置防盗链，防止图片被其他站点盗用。同时可通过角色组设置上传频率、并发数等限制。

### 9.3 配置 HTTPS

如果通过公网访问，建议使用 Nginx 反向代理并启用 HTTPS，避免数据在传输中被窃取。

### 9.4 使用安全版本

OpenAList 已对原版 AList 的已知漏洞进行了修复。建议定期关注 GitHub Releases 更新，及时升级到最新版本。

### 9.5 检查 polyfill 链接

原版 AList 曾存在供应链投毒风险，涉及 `polyfill.io` 链接。登录后台后，进入「设置」→「全局」→「自定义头部」，检查并删除任何指向 `polyfill.io` 的链接。

### 9.6 权限控制

在「用户」→「编辑」中，根据实际需求勾选权限，不要给普通用户开放不必要的管理权限。访客权限建议关闭，避免未授权访问。

### 9.7 API 速率限制

在「设置」→「安全」→「API 速率限制」中启用，建议设置为 **100 次/分钟**，防止 API 被滥用。同时开启审计日志，便于追踪异常操作。

### 9.8 密码管理

新版 OpenAList 已将密码加密存储，不再明文保存，但仍建议使用强密码并定期更换。

### 9.9 Token 获取安全

获取云盘 Token 时，**强烈建议使用本地或离线工具**，不要使用不受信任的在线服务。OneDrive 可以使用 alist-onedrive-api 工具，或通过 rclone 挂载 WebDAV。

## 十、性能优化

### 10.1 别名驱动加速

如果需要频繁访问某个网盘路径，可以使用「别名」驱动。别名驱动支持多并发连接，能显著提升在线看视频和下载的速度。

### 10.2 内存缓存配置

内存缓存并非越大越好。推荐公式：**内存缓存容量 = (系统内存 × 30%) ÷ 平均文件大小 × 0.7**（安全系数）。

### 10.3 缩略图并发限制

缩略图生成可能占用大量内存，可通过配置 `thumb_concurrency` 限制并发线程数，默认值为 16。

### 10.4 上下行限速

如果上传到网盘时因满带宽导致 IP 更换或中断，可以在「传输设置」中配置限速。**客户端限速**控制的是你的设备与 OpenAList 服务器之间的速率，**服务端限速**控制的是 OpenAList 服务器与网盘之间的速率，单位为 KiB/s，负值表示不限速。

## 十一、常见问题

### 11.1 端口冲突导致启动失败

错误信息通常为 `address already in use`。解决方案：

```bash
sudo lsof -i :5244
```

找到占用端口的进程并终止，或者修改 Docker 端口映射为其他端口，例如 `-p 5245:5244`。

### 11.2 忘记密码

使用 4.3 节的重置命令重新设置密码。

### 11.3 添加存储后提示 "failed get storage"

这是正常现象。还没有添加任何存储时，页面会提示此信息。登录后进入后台「存储」页面添加存储即可。

### 11.4 从 AList 迁移

OpenAList 兼容大部分 AList 功能，但直接导入未经修改的 AList 配置文件可能造成未知问题。建议：

1. 备份原 AList 的数据目录
2. 在新服务器上部署 OpenAList
3. 将原数据目录中的 `data` 文件夹复制到新数据目录
4. 启动后检查存储挂载是否正常

> [!NOTE] 迁移注意
> 密码盐值已变更，迁移后需要重置管理员密码。

### 11.5 云盘挂载失败

常见原因包括 Token 过期、权限不足或网络问题。建议：

- 检查 Token 是否有效
- 确认云盘账号是否已授权
- 检查服务器能否正常访问云盘 API

### 11.6 点击重建索引进程立即死掉

如果直接导入未经修改的 AList 的 JSON 配置文件，可能造成多种未知问题。建议**清除配置后重新配置**，不要直接导入旧配置。

### 11.7 OpenWrt/iStore 安装后无法启动

可能是固件版本过老，luci 1.0 不支持 JS 重写的插件。检查 `/www/luci-static/resources/luci.js` 是否存在。

### 11.8 115 分享无法打开

这是一个已知问题，社区有专门的修复脚本可以解决。

### 11.9 1Panel 安装一直显示"安装中"

尝试更换 Docker 加速地址，重启面板后重新安装。

## 十二、从 AList 迁移的补充说明

OpenAList 的界面和使用方式与 AList 几乎完全一致，迁移成本极低。但直接导入 AList 的配置文件可能出问题，建议**先并存验证**：在新服务器上部署 OpenAList，将原 AList 的数据目录复制过去，启动后检查存储挂载是否正常，确认无误后再切换。

需要注意的是，**静态密码盐值已变更**，迁移后必须重置管理员密码。

## 十三、错误对照表

| 现象 | 可能原因 | 解决办法 |
| :--- | :--- | :--- |
| 启动失败 | 端口被占用 | 修改端口映射或终止占用进程 |
| 无法登录 | 密码遗忘 | 使用 `admin set` 重置密码 |
| 存储添加失败 | Token 无效 | 重新获取云盘 Token |
| 视频无法播放 | 编码不支持 | 使用 `ffmpeg` 变体镜像或安装 FFmpeg |
| 页面加载缓慢 | 网络延迟 | 检查服务器网络，或配置 CDN |
| 点击重建索引进程立即死掉 | 导入了未经修改的 AList 配置 | 清除配置后重新配置 |
| OpenWrt 安装后无法启动 | 固件版本过老，不支持 JS 插件 | 检查 luci.js 是否存在，升级固件 |
| 115 分享无法打开 | 已知兼容性问题 | 使用社区修复脚本 |
| 上传大文件失败或中断 | Nginx 默认缓存和超时限制 | 配置 `proxy_request_buffering off` 和超时参数 |
| API 被滥用或频繁请求 | 未启用速率限制 | 开启 API 速率限制，设为 100 次/分钟 |
| 迁移后无法登录 | 密码盐值变更 | 重置管理员密码 |

## 十四、总结

OpenAList 作为 AList 的社区安全分支，保留了原有的功能完整性，同时修复了已知安全漏洞，适合希望自建网盘聚合工具的用户。通过 Docker 部署，几分钟即可完成初始化，后续可按需添加各类云盘存储。

从部署到长期运维，核心在于**数据安全**和**访问性能**两点。做好定期备份、配置反向代理优化、设置合理的权限和速率限制，就能稳定运行很长时间。

如果从 AList 迁移，建议先并存验证，确认无误后再切换。

—— 殇恋