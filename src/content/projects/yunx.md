---
title: "云析 · YunX"
slug: yunx
published: 2026-10-07
order: 100
description: "粘贴分享链接，直接高速下载 —— 一个开源的 Android 网盘解析下载应用。识别夸克 / UC / 迅雷 / 百度 / 139 / 123 / 115 / 光鸭 / 蓝奏云 / 蓝奏云优享版 分享链接，自动匹配提取码，Range 分片并发 + 断点续传。"
image: "images/YunX.jpg"
status: "published"
tags:
  - Android
  - Kotlin
  - Jetpack Compose
  - 网盘解析
  - 下载工具
link:
  - label: "GitHub"
    icon: "fa7-brands:github"
    value: "https://github.com/CYQawa/YunX"
  - label: "下载最新版"
    icon: "material-symbols:download"
    value: "https://github.com/CYQawa/YunX/releases/latest"
  - label: "PC 端"
    icon: "material-symbols:desktop-windows"
    value: "https://github.com/tidain/YunX-Desktop"
  - label: "QQ 交流群"
    icon: "fa7-brands:qq"
    value: "http://qm.qq.com/cgi-bin/qm/qr?group_code=635207650"
lang: "zh_CN"
---

> **云析永远免费开源。** 如果你是在任何地方"花钱买到"的，说明你被骗了，请立即退款。
> 任何收费版本均为二次打包的诈骗版本，与本项目无关。

> **云析使用 AGPL-3.0 开源协议。** 如果你使用了云析的代码，未经授权请遵守协议，同样以 AGPL-3.0 开放源代码。

> 本仓库为仅安卓端 App，PC 端可见 [YunX-Desktop](https://github.com/tidain/YunX-Desktop)。

## 截图

|            |            |            |
| :--------: | :--------: | :--------: |
| ![解析输入](images/Link.jpg) | ![文件列表](images/Parsing.jpg) | ![下载管理](images/Download.jpg) |
|    解析直链    |    分享解析    |    下载管理    |
| ![网盘登录](images/Login.jpg) | ![设置](images/Setting.jpg) | ![关于](images/about.jpg) |
|    网盘登录    |     设置     |     关于     |

## 功能特性

⚡ 分享链接解析：识别主流网盘的分享链接，自动匹配提取码，无需手动输入

🚀 高速下载：Range 分片并发 + 断点续传，任务保存请求头与固定分片规划

🔐 认证备份：使用用户口令派生密钥，以 AES-GCM 加密 Cookie / JWT 备份文件

📋 剪贴板识别：复制分享链接后回到应用，自动提示一键粘贴解析

### 核心功能

- [x] **分享链接解析** —— 识别夸克 / UC / 迅雷 / 百度 / 139 / 123 / 115 / 光鸭 / 蓝奏云 / 蓝奏云优享版 的分享链接，自动匹配提取码
- [x] **高速下载** —— Range 分片并发 + 断点续传，任务保存请求头与固定分片规划，并发上限 32
- [x] **临时转存清理** —— 百度 / 迅雷 / 光鸭取链后清理；夸克保留到下载完成或删除任务后清理
- [x] **认证备份** —— 使用用户口令派生密钥，以 AES-GCM 加密 Cookie / JWT 备份文件
- [x] **剪贴板识别** —— 复制分享链接后回到应用，提示一键粘贴解析

### 多平台登录

- [x] **WebView Cookie** —— 夸克 / UC / 百度 / 139 / 115
- [x] **账号密码 / 短信验证码** —— 迅雷 / 光鸭
- [x] **账号密码换取 JWT** —— 123 云盘
- [x] **账号密码** —— 蓝奏云 / 蓝奏云优享版

如果你有好用的功能和优化，请提交 [Pull Request](https://github.com/CYQawa/YunX/pulls)

## 支持平台

- 夸克网盘
- UC 网盘
- 迅雷网盘
- 百度网盘
- 123 云盘
- 139 网盘（和彩云）
- 115 网盘
- 光鸭云盘
- 蓝奏云
- 蓝奏云优享版

> **WARNING**
> **不建议使用百度网盘，可能导致账号被风控！**

> **NOTE**
> 其他网盘暂未支持，如有需要请开一个 [issue](https://github.com/CYQawa/YunX/issues)。

## 快速开始

### 环境要求

- Android SDK：minSdk 24，targetSdk 34
- Android Studio（推荐）或其它 Android 构建环境

### 本地构建部署

1. **克隆仓库：**

   ```bash
   git clone https://github.com/CYQawa/YunX.git
   ```

2. **打开项目：**

   用 Android Studio 打开项目直接构建即可。项目在 AndroidIDE 上开发调试，理论上也兼容其它 Android 构建环境。

3. **安装使用：**

   在 [Releases](https://github.com/CYQawa/YunX/releases/latest) 页下载最新版 APK 安装，或在 Android Studio 中直接运行到设备。

### 使用流程

1. 在「网盘」页登录需要使用的网盘账号
2. 在「解析」页粘贴分享链接（可带提取码）
3. 浏览分享内容，点击文件获取下载直链
4. 在「下载」页查看进度，支持暂停 / 继续 / 删除 / 打开

## 技术栈

| 分类  | 选型                                    |
| --- | ------------------------------------- |
| 语言  | Kotlin                                |
| UI  | Jetpack Compose + Material 3          |
| 持久化 | Room（KSP 注解处理）+ SharedPreferences     |
| 网络  | OkHttp 4.12.0（请求 + 分片下载）              |
| 构建  | Gradle + KSP                          |

## 友情推荐

> [文析助手](https://github.com/z7786/wenxi)（提供了部分接口）

## 常见问题

<details>
<summary><b>百度网盘下载/转存不了？</b></summary>

你的账号被风控了，见 issue #9。

</details>

<details>
<summary><b>能否开发 PC 端？</b></summary>

我个人没有电脑，故无法开发 PC 端。

社区内已有人开发 PC 移植，如 [YunX-Desktop](https://github.com/tidain/YunX-Desktop)。

</details>

## 反倒卖

> 云析完全免费开源。如果你下载到要钱的版本，那么你就是被骗了，请立马去退款。

- 倒卖狗 🐶：`qq1360735243`

## 免责声明

本项目仅供个人学习与技术交流，请勿用于商业用途。下载内容版权归原作者所有，请在下载后 24 小时内删除。使用本项目产生的任何后果由使用者自行承担。

## 开源协议

本项目基于 [GNU AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) 协议开源，详见根目录 [LICENSE](./LICENSE)。

## 贡献者

<a href="https://github.com/CYQawa/YunX/graphs/contributors">
  <img alt="contributors" src="https://contrib.rocks/image?repo=CYQawa/YunX" />
</a>

## Star History

[![Star History Chart](https://api.star-history.com/chart?repos=CYQawa/YunX&type=date&legend=top-left)](https://www.star-history.com/?repos=CYQawa%2FYunX&type=date&legend=top-left)