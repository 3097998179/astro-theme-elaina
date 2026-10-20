---
title: ZViewer：自托管的多人同步观影平台
published: 2026-10-21
description: 支持 Bilibili、网盘、Emby 等多源接入的多人同步观影工具，具备弹幕、字幕、语音与屏幕共享功能，可 Docker 一键部署。
image: ./images/index10(8).avif
tags: [ZViewer, 观影, 自托管, Docker, 工具]
category: 旅人分享
slug: zviewer-guide
series: "实用工具推荐"
seriesOrder: 2
---

# ZViewer：自托管的多人同步观影平台

## 一、项目简介

ZViewer 是一个开源的多人同步观影与共享平台，目标是让身处不同地点的人也能像坐在一起一样看番、看电影。项目由开发者 Zero-wyc 独立开发并开源，目前在 GitHub 上持续更新。

与简单的“一起看”工具不同，ZViewer 覆盖了从视频源接入、格式兼容、弹幕字幕到语音互动的完整链路，并提供了多种部署方式，适合自托管使用。

项目地址：[https://github.com/Zero-wyc/ZViewer](https://github.com/Zero-wyc/ZViewer)

文档手册：[https://docx.zviewer.zero251.xyz](https://docx.zviewer.zero251.xyz)

前端预览：[https://zviewer.zero251.xyz](https://zviewer.zero251.xyz)

[grid]
![示例](./images/index10(1).avif)
![示例2](./images/index10(2).avif)
![示例3](./images/index10(3).avif)
![示例4](./images/index10(4).avif)
![示例5](./images/index10(5).avif)
![示例6](./images/index10(6).avif)
![示例7](./images/index10(7).avif)
[/grid]

## 二、核心功能

### 2.1 多人同步观影

房主控制播放、暂停、跳转和倍速，观众实时跟随。即使房主断线，服务器也会继续广播，播放不会中断。房主还可以任命房管协助管理房间。

### 2.2 多源视频接入

支持多种视频来源：

- **Bilibili**：包括分P、清晰度切换和大会员画质
- **MP4 直链**
- **WebDAV / FTP / OpenList 网盘挂载**
- **Emby / Jellyfin 媒体库**
- **服务器本地目录**

### 2.3 广泛的格式兼容

通过服务端转码或代理，支持 MKV、AVI、TS、WMV 等浏览器原生不支持的格式，以及 DTS、AC3 等音频编码。

### 2.4 三种播放模式

ZViewer 提供三种按需切换的播放模式：

| 模式 | 特点 | 适用场景 |
| :--- | :--- | :--- |
| CLI 本地代理 | 使用自己的 Cookie 在本地解析，享受大会员画质，不耗服务器流量 | 追求高画质且想节省服务器资源 |
| 服务器 DASH 转发 | 全房高清，但消耗服务器带宽 | 服务器带宽充足 |
| MP4 直链转发 | 最高 720P，兼容性兜底 | 对画质要求不高或网络受限 |

其中 CLI 代理由 **ZViewerCLI** 实现。这是一个用 Go 编写的本地代理程序，运行在用户自己的电脑上，用你的 Bilibili Cookie 在本地解析并代理视频流，让房间内所有人都能共享大会员画质，同时几乎不消耗服务器带宽。

### 2.5 一起听音乐

支持网易云音乐和 Bilibili 双音源，歌单可自动补位推荐，并支持双收藏夹一键收藏。歌词页支持频谱可视化、评论区和 PV 视频背景。

### 2.6 弹幕与字幕

- **弹幕**：支持 Bilibili 官方弹幕、DandanPlay 弹幕以及本地 XML / JSON 文件，可多轨叠加
- **字幕**：支持 SRT、ASS、SSA、VTT 等多种格式

### 2.7 实时互动

包括评论面板、观众申请控制、语音聊天以及基于 WebRTC 的屏幕共享。

### 2.8 个性化与主题

采用 Material You 动态主题，可从壁纸提取色彩生成完整色板，支持明暗切换、自定义背景和玻璃拟态 UI。


## 三、技术架构与开发背景

ZViewer 的前端是一个现代化的 Web 应用，后端负责房间管理、同步广播和媒体流处理。项目提供多种部署方式，包括源码一键启动、单文件 exe、Docker 镜像，以及通过 GitHub Actions 自动构建。

关于开发过程，作者 Zero-wyc 在博客中透露，这个项目**完全由他一人 + AI 开发**，前前后后耗时约两个月，其中第一个月因推倒重来而未计入。他使用的 AI 工具包括但不限于 **KimiK3、GLM5.2、DeepSeekV4Flash、KimiK2.7Code、opus4.8、fable5** 等，属于混合开发模式。作者也坦言目前软件仍有许多 Bug，欢迎提交 PR 和 Star，有问题可以加 QQ 群反馈。

> [!NOTE] 开发模式
> 一人 + AI 混合开发，两个月完成从零到可用。虽然仍有 Bug，但功能覆盖已经相当完整，适合作为自托管观影平台的参考项目。

## 四、部署与使用

### 4.1 浏览器要求

推荐使用 **Chrome / Edge 等内核 130+ 的 Chromium 浏览器**。Safari 和 Firefox 对 MSE / MKV 解码支持不完整，可能出现卡顿或字幕异常。

### 4.2 部署方式

项目文档提供了详细的部署指南。首次启动会自动创建 `root` 管理员账号。

常见部署方式：

- **Docker**：拉取镜像后一条命令启动，适合服务器长期运行
- **单文件 exe**：Windows 下直接运行，适合本地快速体验
- **源码启动**：适合二次开发或自定义构建
- **GitHub Actions**：自动构建，适合持续集成


### 4.3 文档与预览

- 文档手册：[https://docx.zviewer.zero251.xyz](https://docx.zviewer.zero251.xyz)
- 前端预览：[https://zviewer.zero251.xyz](https://zviewer.zero251.xyz)

社区还有正在开发中的手机端 ZViewerAPP。

## 五、适用场景与评价

### 5.1 适合谁

- 希望自托管“一起看”平台的用户
- 需要 Bilibili 高画质同步观影的场景
- 有 Emby / Jellyfin 媒体库，想和朋友一起看的用户
- 对弹幕、字幕、语音互动有需求的观影群体

### 5.2 优势

- **功能完整**：多源接入、格式兼容、弹幕字幕、语音互动、屏幕共享整合在一个平台
- **CLI 代理方案**：在画质和服务器成本之间提供了实用的折中
- **部署灵活**：Docker、单文件、源码、Actions 多种方式
- **持续更新**：作者活跃维护，社区反馈渠道畅通

### 5.3 需要注意

- 项目仍在活跃开发中，存在一些 Bug
- Safari 和 Firefox 支持不完整，建议使用 Chromium 浏览器
- 服务器 DASH 转发模式会消耗较多带宽，需要根据实际情况选择播放模式
- 手机端仍在开发中

## 六、总结

ZViewer 是一个功能相当完整的自托管“一起看”解决方案。它没有停留在简单的视频同步，而是把多源接入、格式兼容、弹幕字幕、语音互动、屏幕共享等功能整合在一个平台里，并通过 CLI 代理在画质和服务器成本之间提供了一个实用的折中方案。

如果你对自托管观影平台感兴趣，或者想找一个支持 Bilibili 高画质和丰富互动的替代方案，ZViewer 值得关注和尝试。

项目地址：[https://github.com/Zero-wyc/ZViewer](https://github.com/Zero-wyc/ZViewer)

—— 殇恋