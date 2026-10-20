---
title: 花笺：一款轻量优雅的 Windows 本地便签工具
published: 2026-10-21
description: 基于 Tauri 2 与 React 19 构建的桌面便签工具，十几 MB 安装包、全局快捷键唤出、纯本地存储，适合快速记录碎片信息。
image: ./images/index9.avif
tags: [花笺, 便签, Windows, Tauri, 工具]
category: 旅人分享
slug: floral-notepaper-guide
series: "实用工具推荐"
seriesOrder: 1
---

# 花笺：一款轻量优雅的 Windows 本地便签工具

## 一、项目简介

花笺（Floral Notepaper）是一款面向 Windows 与 macOS 的本地桌面便签工具。项目基于 **Tauri 2 + React 19** 构建，安装包仅十几 MB，内存占用远低于同类 Electron 应用。

它的定位很明确：在系统自带便笺的简陋与 Notion 等重型笔记软件的臃肿之间，提供一个**打开快、不干扰、用完即走**的轻量方案。所有数据保存在本地，无需联网，代码以 MIT 协议开源。

项目地址：[https://github.com/Achilng/floral-notepaper](https://github.com/Achilng/floral-notepaper)

<!-- 图片 1：软件主界面截图，展示便签列表或主窗口整体外观 -->
![花笺主界面](./images/index9(1).avif)

## 二、核心功能

花笺的功能设计围绕一个目标：**降低记录的门槛，减少思路被打断的可能**。

### 2.1 全局快捷便签

默认快捷键为 `Ctrl + Space`。在任何界面按下，一个小窗口会在鼠标位置附近弹出，写完即关，无需在应用之间来回切换。所有快捷键都可在设置中重新录制，并自动检测是否与其他软件冲突。

<!-- 图片 2：快捷便签弹出窗口截图，最好能看出它在桌面或应用上方浮动 -->
![全局快捷便签](./images/index9(2).gif)

### 2.2 Markdown 实时预览

支持 GitHub Flavored Markdown（GFM）语法，编辑与预览可一键切换。v1.1.0 版本后增加了对行内 HTML、GFM Alerts 和代码块语言标签的支持，日常记录足够使用。

### 2.3 桌面磁贴

可以将笔记以磁贴形式固定在桌面角落，适合当作临时剪贴板、待办清单或会议码查看器。磁贴同样支持 Markdown 渲染与颜色更换。

<!-- 图片 3：桌面磁贴效果截图，展示磁贴贴在桌面上、多个磁贴并排的样子 -->
![桌面磁贴](./images/index9(3).avif)

### 2.4 数据完全本地化

所有内容仅保存在本地磁盘，**无需联网，零云端依赖**。支持 `.md` 文件导入导出，方便与其他工具互通。

## 三、技术架构

花笺的轻量，源于技术选型上的克制。

| 层面 | 技术选型 | 带来的好处 |
| :--- | :--- | :--- |
| 桌面框架 | Tauri 2 | 不打包完整浏览器内核，使用系统自带 WebView，安装包仅十几 MB，内存占用远低于 Electron 应用 |
| 前端 UI | React 19 + TypeScript | 组件化开发，界面流畅，易于维护 |
| 底层操作 | Rust | 负责文件读写、窗口管理、全局快捷键注册，兼顾性能与安全 |

> [!NOTE] 为什么比 Electron 轻
> Electron 应用会将整个 Chromium 浏览器内核打包进安装包，体积通常在一百 MB 以上。Tauri 则复用操作系统自带的 WebView，只打包应用本身的逻辑与资源，因此安装包和内存占用都能大幅降低。

## 四、安装方式

花笺支持 Windows 与 macOS 双平台。Windows 用户还可以直接在 Microsoft Store 搜索「花笺」安装。

GitHub Releases 下载参考：

| 系统 | 架构 | 推荐类型 | 文件名参考 |
| :--- | :--- | :--- | :--- |
| Windows | x64 | 安装程序 | `floral-notepaper_版本号_x64-setup.exe` |
| Windows | x64 | 便携版 | `floral-notepaper_版本号.exe` |
| macOS | Apple Silicon | DMG | `floral-notepaper_版本号_aarch64.dmg` |
| macOS | Intel | DMG | `floral-notepaper_版本号_x64.dmg` |

> [!WARNING] 关于更新
> 通过 MSIX 安装包（包括 Microsoft Store 版本）暂不支持应用内更新，需要前往商店或 GitHub Releases 获取新版本。

## 五、使用技巧

### 5.1 快捷键冲突检测

在设置中重新录制快捷键时，软件会自动检测是否与其他正在运行的软件冲突，避免按下快捷键无响应。

### 5.2 窗口跟随鼠标

开启「窗口跟随鼠标」后，快捷便签会在鼠标指针附近弹出，减少视线移动，记录更顺手。

### 5.3 磁贴编辑

磁贴默认不可直接编辑。在磁贴上右键选择「转为小窗」即可恢复编辑模式。也可以在设置中开启「双击磁贴进入编辑」，操作更直接。

### 5.4 Markdown 语法速查

```markdown title="常用语法"
# 一级标题
## 二级标题
**加粗文字**
*斜体文字*
- 无序列表项
1. 有序列表项
`行内代码`
[链接文字](https://example.com)
```

> [!TIP] GFM Alerts
> 花笺支持 GitHub 风格的提醒框，语法为 `> [!NOTE]`、`> [!TIP]`、`> [!WARNING]` 等，适合在便签里做重点标记。

## 六、适用场景与评价

### 6.1 适合谁

- 需要随手记录灵感、待办、临时文本的用户
- 希望便签工具打开快、不占用系统资源的用户
- 对数据隐私有要求、不希望内容上传云端的用户
- 已经在使用 Markdown、希望便签也支持 Markdown 的用户

### 6.2 不适合谁

- 需要标签系统、双链、数据库视图等知识管理功能的用户
- 依赖多端同步、希望在手机和电脑之间无缝衔接的用户
- Linux 桌面用户（目前主要完善 Windows 与 macOS，Linux 需自行从源码构建）

### 6.3 优势

- **极致轻量**：Tauri 2 架构，安装包十几 MB，内存占用低
- **记录顺畅**：全局快捷键加鼠标位置弹出，把记录动作的阻力降到最低
- **隐私安心**：纯本地存储，代码开源，数据完全由自己掌控
- **细节到位**：快捷键冲突检测、窗口跟随鼠标、磁贴编辑切换等小功能实用

### 6.4 需要注意

- 功能相对基础，它是一张好用的「电子便签纸」，不是「第二大脑」
- MSIX 版本不支持应用内更新，需要手动获取新版本
- 平台覆盖以 Windows 和 macOS 为主

## 七、总结

花笺是一款定位清晰、技术选型克制的桌面便签工具。它没有试图做一个全能的知识管理软件，而是把「快速记录」这一件事做好：快捷键唤出、Markdown 支持、桌面磁贴、纯本地存储。

如果你在寻找一个打开快、不干扰、用完即走的 Windows 便签工具，花笺值得一试。

项目地址：[https://github.com/Achilng/floral-notepaper](https://github.com/Achilng/floral-notepaper)

—— 殇恋