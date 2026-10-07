---
title: "Image Toolbox 图像工具箱"
slug: image-toolbox
published: 2026-10-07
order: 100
description: "一款功能极为丰富的开源 Android 图像工具箱：裁剪、500+ 滤镜、EXIF 编辑、AI 背景移除与增强、格式转换、PDF 工具、条形码、拼贴、加密解密、色彩管理、代码截图生成等。"
image: "images/banner.png"
status: "published"
tags:
  - Android
  - Kotlin
  - Jetpack Compose
  - 图像编辑
  - 开源工具
link:
  - label: "GitHub"
    icon: "fa7-brands:github"
    value: "https://github.com/T8RIN/ImageToolbox"
  - label: "Google Play"
    icon: "fa7-brands:google-play"
    value: "https://play.google.com/store/apps/details?id=ru.tech.imageresizershrinker"
  - label: "F-Droid"
    icon: "fa7-brands:android"
    value: "https://f-droid.org/packages/ru.tech.imageresizershrinker"
  - label: "Wiki"
    icon: "material-symbols:menu-book"
    value: "https://github.com/T8RIN/ImageToolbox/wiki"
  - label: "Telegram"
    icon: "fa7-brands:telegram"
    value: "https://t.me/t8rin_imagetoolbox"
lang: "zh_CN"
---

## 项目简介

Image Toolbox 是一款功能极其丰富的 Android 图像编辑工具，面向普通用户和开发者。可裁剪、加滤镜、编辑 EXIF、擦除背景，甚至用 AI 增强画质。界面简洁，能力却相当硬核。

更多信息见 [Wiki](https://github.com/T8RIN/ImageToolbox/wiki)，交流请加入 [Telegram 群](https://t.me/t8rin_imagetoolbox)，beta 版发布在 [CI 频道](https://t.me/t8rin_imagetoolbox_ci)。

## 下载

- [Google Play](https://play.google.com/store/apps/details?id=ru.tech.imageresizershrinker)
- [F-Droid](https://f-droid.org/packages/ru.tech.imageresizershrinker)
- [GitHub Releases](https://github.com/t8rin/imageresizer/releases/latest)
- [Obtainium](https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22ru.tech.imageresizershrinker%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FT8RIN%2FImageToolbox%22%2C%22author%22%3A%22T8RIN%22%2C%22name%22%3A%22Image%20Toolbox%22%7D)

## 构建

```bash
git clone https://github.com/T8RIN/ImageToolbox.git
cd ImageToolbox
./gradlew build
```

## FOSS 版与市场版的差异

| 功能 | FOSS 版 | 市场版 |
|:---:|:---:|:---:|
| 二维码扫描 | Zxing | MlKit |
| 自动抠图 | ONNX | MlKit |
| 文档扫描 | OpenCV | MlKit |
| RAR 解密 | ✗ | Junrar |
| 统计分析 / Crashlytics | ✗ | ✓ |
| 其他 Google 依赖 | ✗ | ✓ |
| 其余全部功能 | ✓ | ✓ |

## 功能概览

**图像编辑**

- 批量处理；滤镜链叠加，内置 **500+ 滤镜**（调色、模糊、抖动、风格化、故障艺术、色调映射、形态学等）
- 自定义滤镜模板：可从任意滤镜链创建，支持二维码分享与扫描导入
- 原生分形生成（75 种 2D/3D 类型）；纹理生成（**170+ 预设**）
- 照片马赛克、贴纸与文字图层、图片拼接 / 堆叠 / 拆分
- 抠图：手绘或自动（MlKit / U2Net / RMBG / BiRefNet / ISNet / YOLO / MODNet 等）
- 水印：重复文字、图片、印章、时间戳、隐写
- 绘制工具：画笔、喷枪、霓虹、高光、变形、隐私模糊、像素化、修复画笔，以及各类箭头、形状、套索
- 裁剪：自由旋转、四角透视校正、比例裁剪、自定义比例、形状遮罩
- 缩放：多种缩放算法（Lanczos / Spline / Magic Kernel / EWA 等）+ 多种色彩空间（sRGB / LAB / Oklab / Jzazbz 等）

**格式与文档**

- 格式转换：HEIF / HEIC / AVIF / WEBP / JPEG / PNG / JXL / JP2 / TIFF / QOI / ICO 等
- 动图互转：GIF / APNG / WEBP / JXL 之间转换，支持多个动图合并
- PDF 工具：图片互转、合并、拆分、旋转、重排、页码、水印、签名、压缩、修复、加密解密、元数据、裁剪、扁平化、OCR 转文本等
- 归档工具：ZIP / 7Z / TAR / CPIO / AR / ISO 等 32 种组合，支持密码保护与解密，支持 CBR / CBZ / CB7 / CBT 漫画包
- 文档扫描；图片转 SVG；文件打包为 Zip

**AI 能力**

- 100+ 现成模型：超分、抠图、去 JPEG 伪影、去噪、上色、增强、动漫化、扫描件优化、风格迁移、AI 检测
- 深度估计（14 个模型 + 13 种景深效果）：深度图、镜头虚化、人像对焦、电影级景深调色、重打光、雾效、法线、立体深度边缘

**实用工具**

- OCR 文字识别：120+ 语言，多种精度模式、引擎可选（Tesseract / PaddleOCR），支持批量识别、写入 EXIF、生成可搜索 PDF
- 条形码：扫描与生成 13 种格式（QR / AZTEC / CODE 39/93/128 / DATA MATRIX / EAN / ITF / PDF 417 / UPC），支持导出光栅或 SVG
- 拼贴：1–20 张图，310+ 布局
- 图片压缩：质量压缩、预设压缩、按目标体积（KB）压缩
- 图片对比：滑动、点击切换、透明度、并排、逐像素（SSIM / AE / MAE / NCC / PSNR / RMSE）
- 色彩工具：调色板生成与 41 种格式导入导出、取色、渐变、混合、和谐色、明暗、色调曲线（波形图 / 矢量示波器 / 直方图）、33000+ 颜色库
- Shader Studio：GLSL 着色器编辑、预览、导入导出
- 代码截图生成：190+ 语言高亮、256 主题、30 渐变背景，可调圆角、行号、窗口控件、阴影
- 其他：Base64 编解码、旋转翻转、Perlin 噪声、SVG/DNG/PSD/DJVU 预览、自定义保存目录、导出配置（内置 61 种社交平台预设）、撤销重做、随机 / 校验和文件名、64 种哈希算法、音频封面导出、壁纸导出、ASCII 艺术、批量重命名、重复图片查找、快捷设置磁贴

**界面自定义**

- 顶栏 Emoji、Pixel 风格开关、安全模式、屏幕最大亮度、应用内语言切换、彩带效果
- 自定义配色：调色板风格、预设方案、颜色反转、对比度调节、边框粗细、阴影开关、触感反馈
- 亮 / 暗 / AMOLED 模式；低于 Android 12 也支持动态取色（Monet）
- 图标背景形状、自定义字体（内置 26 款，支持导入 OTF/TTF）、字体缩放
- 开关 / 滑块 / 形状风格多选，主界面布局自定义

## 技术栈

- 最低 SDK 24，基于 [Kotlin](https://kotlinlang.org/)
- 自研库：[Image Toolbox Libs](https://github.com/T8RIN/ImageToolboxLibs)、[Dynamic Theme](https://github.com/T8RIN/DynamicTheme)、[Modal Sheet](https://github.com/T8RIN/ModalSheet)
- 异步与响应式：[Coroutines](https://github.com/Kotlin/kotlinx.coroutines)、[Flow](https://kotlin.github.io/kotlinx.coroutines/)
- 架构与依赖注入：[Decompose](https://github.com/arkivanov/Decompose)、[Hilt](https://dagger.dev/hilt/)
- 图片加载：[Coil](https://github.com/coil-kt/coil)
- UI：[Jetpack Compose](https://developer.android.com/jetpack/compose) + [Material 3](https://developer.android.com/jetpack/androidx/releases/compose-material3)、[Konfetti](https://github.com/DanielMartinus/Konfetti)
- 数据存储：[DataStore](https://developer.android.com/jetpack/androidx/releases/datastore)
- 图像处理：[GPU Image](https://github.com/cats-oss/android-gpuimage)、[DeJpeg](https://github.com/jeeneo/dejpeg)、[AVIF Coder](https://github.com/awxkee/avif-coder)、[JXL Coder](https://github.com/awxkee/jxl-coder)、[Aire](https://github.com/awxkee/aire)、[Trickle](https://github.com/T8RIN/Trickle)

模块依赖图见 [ARCHITECTURE.md](https://github.com/T8RIN/ImageToolbox/blob/master/ARCHITECTURE.md)。

## 翻译

欢迎在 [Hosted Weblate](https://hosted.weblate.org/engage/image-resizer/) 上帮助翻译 Image Toolbox。

## 支持项目

- 给仓库点个 [Star](https://github.com/t8rin/ImageToolbox/stargazers) ⭐
- [关注作者](https://github.com/t8rin) 获取后续作品
- 捐赠：[Boosty](https://boosty.to/t8rin) ｜ TON `UQDMePBU-FaxwaIME8p7h2spRITeRxvtCPegtKefeV5v-sN1`

## Star 趋势

[![Star History Chart](https://api.star-history.com/chart?repos=T8RIN/ImageToolbox&type=date&legend=top-left)](https://www.star-history.com/?repos=T8RIN%2FImageToolbox&type=date&legend=top-left)

## 贡献者

<a href="https://github.com/t8rin/imageresizer/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=t8rin/Imageresizer"/>
</a>

## 签名证书哈希

SHA-256: `20d7689de0874f00015ea3e31fa067c15c03457d362d41d5e793db3a864fa534`

SHA-1: `d69eacb30eeae804e8b72d2384c3c616b1906785`

MD5: `db6f6b76c503d31099e4754e676353cf`

校验方法见 [Wiki](https://github.com/T8RIN/ImageToolbox/wiki/FAQ#how-can-i-verify-my-download-of-imagetoolbox-is-legitimate)。

## 开源协议

Copyright 2023 T8RIN，基于 [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0) 开源。
