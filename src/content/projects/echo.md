---
title: "ECHO"
slug: echo
published: 2026-10-07
order: 100
description: "为本地音乐而生的桌面播放器：认真管理每一首歌，也认真对待每一次播放。本地曲库、动态歌词、WASAPI / ASIO 输出、壁纸联动与创意工坊扩展。"
image: "images/echo.jpg"
status: "published"
tags:
  - 桌面应用
  - Electron
  - React
  - TypeScript
  - SQLite
  - 音乐播放器
link:
  - label: "官网"
    icon: "material-symbols:home"
    value: "https://echonext.moe/"
  - label: "Steam"
    icon: "fa7-brands:steam"
    value: "https://store.steampowered.com/app/5105090/ECHO/"
  - label: "GitHub"
    icon: "fa7-brands:github"
    value: "https://github.com/Moekotori/ECHO"
  - label: "获取社区版"
    icon: "material-symbols:download"
    value: "https://github.com/Moekotori/ECHO/releases"
  - label: "Android 版"
    icon: "fa7-brands:android"
    value: "https://github.com/Moekotori/echoandroid"
  - label: "使用文档"
    icon: "material-symbols:menu-book"
    value: "https://echonext.moe/zh/docs/"
  - label: "English"
    icon: "material-symbols:translate"
    value: "https://github.com/Moekotori/ECHO/blob/main/README_EN.md"
lang: "zh_CN"
---

> **让音乐库成为你的主场。**
> 为本地音乐而生的桌面播放器：认真管理每一首歌，也认真对待每一次播放。

## 社区版：永久免费，AGPL 开源

社区版**永久免费**，采用 [AGPL v3](https://github.com/Moekotori/ECHO/blob/main/LICENSE) 开源协议，维护依靠大家共同参与。欢迎从 [GitHub Releases](https://github.com/Moekotori/ECHO/releases) 获取播放器，一起修复问题、完善功能、改进文档与翻译。

## Android 版：把 ECHO 带在身边

**[前往 ECHO Android 仓库 →](https://github.com/Moekotori/echoandroid)** · **[下载 Android APK](https://github.com/Moekotori/echoandroid/releases/latest)**

ECHO Android 是原生 Android 音乐播放器，支持本地与远程曲库、动态歌词和声音调整，也可以通过 **Echo Link 与 PC ECHO（ECHOSteam）联动**：在手机上浏览电脑曲库、遥控电脑播放，或将电脑音乐串流到手机。

联动时请让手机与电脑处于同一局域网，在支持 Echo Link 的 PC ECHO 中开启服务，并使用完整配对链接完成首次授权。具体功能取决于两端版本，连接步骤见 [Android 联动指南](https://github.com/Moekotori/echoandroid#与-pc-echo-联动)；PC ECHO 可从 [Steam 商店](https://store.steampowered.com/app/5105090/ECHO/) 获取。

## Steam 版：更好的优化，更多功能，更好的性能

社区版永久免费、源码开放。Steam 版沿着同一套本地听歌体验往前走：优化更完整，功能更多，性能也更好。自动更新、部分设置的 Cloud 同步、成就、好友状态和创意工坊都在这条产品线上。你可以从一张专辑封面开始，整理自己的曲库，再把歌词、视觉与桌面布置成喜欢的样子。

**以下四张图片均展示 Steam 版。**

<!--
  以下四节对应 README 的 4 张 Steam 版配图，图片补齐后删除本注释即可启用。
  需要放到 src/content/projects/images/ 下的文件：
    steam-performance.png  任务管理器性能快照
    steam-ui.png           浅色主题界面
    steam-wallpaper.webp   壁纸墙示例
    steam-workshop.png     创意工坊 ECHO Code

### 01 / 16,813 首歌，照样轻装上阵

**16,813 首曲目、1,856 张专辑，播放中。**截图里的 Windows 任务管理器显示：ECHO 进程组 **589.2 MB 内存、1.1% CPU**。曲库扫描、元数据处理与播放各有明确职责；低配置模式和后台任务降载，让大曲库也能轻快打开。

![Steam 版播放时的任务管理器快照](images/steam-performance.png)

### 02 / 你的曲库，你的审美

封面、专辑、艺术家、最近播放、歌词和队列集中在同一套桌面界面里。深色、浅色与不同风格的主题让音乐库随着你的喜好变化；播放栏始终在手边，想听哪首歌，不必在层层窗口里寻找。

![Steam 版 ECHO 浅色主题界面](images/steam-ui.png)

### 03 / 让桌面随音乐呼吸

让专辑封面铺满桌面，让当前曲目、进度与音频可视化跟着音乐变化。ECHO 提供与 Wallpaper Engine 联动的桥接能力；壁纸创作者也可以从仓库里的 [Web 壁纸示例](https://github.com/Moekotori/ECHO/tree/main/examples/wallpaper-engine/echo-web-wallpaper) 开始制作自己的场景。

![Steam 版壁纸墙示例](images/steam-wallpaper.webp)

### 04 / 把播放器交给创作者

在 [Steam 创意工坊](https://steamcommunity.com/app/5105090/workshop/)探索并订阅社区作品：主题、歌词场景、可视化与扩展，让同一首歌有不同的打开方式。下图的 **ECHO Code** 把歌词跟随、播放进度、音频流信息和实时频谱排成一块可交互的终端面板。

![Steam 创意工坊作品 ECHO Code](images/steam-workshop.png)
-->

### 还可以更深入

| 想做的事 | ECHO 提供的能力 |
| --- | --- |
| 认真听自己的音乐 | 本地曲库、专辑与艺术家浏览、歌单、动态歌词和播放历史 |
| 选择合适的输出 | 系统输出、WASAPI Shared / Exclusive、ASIO，连接耳机、音箱与外置 DAC |
| 看见声音链路 | 编码、采样率、输出设备与处理状态一目了然 |
| 换一种听歌氛围 | 主题、可视化、壁纸联动以及创意工坊作品 |
| 接入 Steam | 更新、部分设置的 Cloud 同步、成就、好友状态与创意工坊 |

Audio Core 与原生宿主负责真实播放状态；输出模式、设备能力和回退原因都有据可查。界面负责呈现，也给每一次切换一个明确的结果。

> **打开自己的音乐，听见自己的世界。**
> [前往 Steam 商店 →](https://store.steampowered.com/app/5105090/ECHO/)

## 技术架构

| 层 | 选型 |
| --- | --- |
| Renderer | React + TypeScript |
| Bridge | Typed IPC |
| Main | Electron |
| Library | SQLite |
| Audio | Audio Core + Native Host |

详见 [ECHO Next 架构文档](https://github.com/Moekotori/ECHO/blob/main/docs/ECHO_NEXT_ARCHITECTURE.md)。

## 许可证

Copyright (c) 2026 Moekotori.

本仓库中由项目拥有、且未另行注明许可证的代码、文档与材料，采用 **GNU Affero General Public License v3.0（AGPL-3.0-only）**。完整条款见 [LICENSE](https://github.com/Moekotori/ECHO/blob/main/LICENSE)。第三方组件、依赖、字体、媒体工具和 SDK 仍遵循各自的许可证。
