import type { BackgroundWallpaperConfig } from "@/types/backgroundWallpaper";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	// 壁纸模式："banner" 横幅壁纸，"fullscreen" 全屏壁纸，"overlay" 覆盖透明，"none" 纯色背景无壁纸
	mode: "fullscreen",
	// 是否启用背景视频播放，配置后将在导航栏显示视频播放按钮
	playerEnable: true,
	/**
	 * 背景图片配置
	 * ...
	 */
	src: {
		// 桌面背景图片（支持单张或多张随机）
		desktop: [
			"assets/images/DesktopWallpaper/d1.avif",
			"assets/images/DesktopWallpaper/d2.avif",
			"assets/images/DesktopWallpaper/d3.avif",
			"assets/images/DesktopWallpaper/d4.avif",
			"assets/images/DesktopWallpaper/d5.avif",
			"assets/images/DesktopWallpaper/d6.avif",
		],
		// 移动背景图片（支持单张或多张随机）
		mobile: [
			"assets/images/MobileWallpaper/m1.avif",
			"assets/images/MobileWallpaper/m2.avif",
			"assets/images/MobileWallpaper/m3.avif",
			"assets/images/MobileWallpaper/m4.avif",
			"assets/images/MobileWallpaper/m5.avif",
			"assets/images/MobileWallpaper/m6.avif",
		],
		// 背景视频播放地址（数组形式表示多个视频循环播放）
		playerUrl: [
			"assets/videos/v1.mp4",
			"assets/videos/v2.mp4",
			"assets/videos/v3.mp4",
		],
	},
	// 横幅壁纸和全屏壁纸共享配置
	common: {
		// 壁纸遮罩暗度，让横幅文字显示更清晰，0-1之间，值越大越暗
		dimOpacity: 0.2,
		// 多视频播放模式："order" 顺序循环，"random" 随机切换（仅当 playerUrl 为数组时生效）
		playerMode: "order",
		// 主页横幅文字
		homeText: {
			// 是否启用主页横幅文字
			enable: true,
			// 主页横幅主标题
			title: "灰之诗旅",
			// 主页横幅主标题字体大小
			titleSize: "4.5rem",
			// 主页横幅副标题
			subtitle: [
				"请翻开这一页，成为旅途中新的见证者.",
				"故事在这里落幕，而你的旅程将从这一刻开始.",
				"下一站去哪呢……就留到明天再决定吧.",
				"所谓终点，或许只是另一段长途跋涉的间隙.",
				"「风会停下，而旅人不会」.",
				"在灰之诗篇，我续写不休.",
				"星夜为纸墨，诸国作诗行.",
				"旅途无尽处，笔落即故乡.",
			],
			// 主页横幅副标题字体大小
			subtitleSize: "1.5rem",
			typewriter: {
				// 是否启用打字机效果
				enable: false,
				// 打字速度（毫秒）
				speed: 180,
				// 删除速度（毫秒）
				deleteSpeed: 100,
				// 完全显示后的暂停时间（毫秒）
				pauseTime: 1500,
			},
			// 是否显示标题下方的链接图标
			linksEnable: false,
			// 首页横幅标题下方的链接图标（可选，支持 showName 显示文字）
			links: [
				{
					name: "QQ",
					icon: "fa7-brands:qq",
					url: "https://qm.qq.com/q/GElQei2g4W",
					showName: true,
				},
				{
					name: "Email",
					icon: "fa7-solid:envelope",
					url: "mailto:3097998179@qq.com",
				},
				{
					name: "bilibili",
					icon: "fa7-brands:bilibili",
					url: "https://b23.tv/FPpOWl9",
				},
				{
					name: "RSS",
					icon: "fa7-solid:rss",
					url: "/rss/",
				},
			],
		},
		// 壁纸轮播配置，横幅壁纸和全屏壁纸共享，仅在配置多张图片时生效
		carousel: {
			// 是否启用壁纸轮播；关闭时保持每次刷新随机显示一张
			enable: true,
			// 轮播切换间隔（毫秒）
			interval: 5000,
			// 过渡效果: 'fade' 渐变 | 'zoom' 缩放 | 'slide' 滑动 | 'kenburns' 旋转木马
			transitionEffect: "zoom",
		},
		// 水波纹动画效果配置
		waves: {
			enable: {
				// 桌面端是否启用水波纹动画效果
				desktop: true,
				// 移动端是否启用水波纹动画效果
				mobile: true,
			},
		},
		// 渐变过渡效果配置
		gradient: {
			enable: {
				// 桌面端是否启用渐变过渡
				desktop: true,
				// 移动端是否启用渐变过渡
				mobile: true,
			},
			// 渐变高度
			height: "10%",
		},
	},
	// Banner模式特有配置
	banner: {
		// 图片位置
		position: "0% 20%",
		// 文章横幅信息
		postInfo: {
			mode: "description",
		},
		// 导航栏配置
		navbar: {
			// 导航栏透明模式
			transparentMode: "semifull",
			// 毛玻璃模糊度
			blur: 12,
		},
	},
	// 覆盖透明覆盖模式特有配置
	overlay: {
		// 层级，确保壁纸在背景层
		zIndex: -1,
		// 壁纸透明度
		opacity: 0.8,
		// 背景模糊度
		blur: 0,
		// 卡片透明度
		cardOpacity: 0.6,
	},
	// 全屏壁纸模式特有配置
	fullscreen: {
		// 布局模式："classic" 经典文档流全屏壁纸，"hero" 固定全屏首屏壁纸
		layout: "hero",
		// 图片位置
		position: "center",
		// 全屏壁纸模式的导航栏配置
		navbar: {
			// 导航栏透明模式
			transparentMode: "semifull",
			// 导航栏毛玻璃模糊度
			blur: 12,
		},
		// 首页下滑时壁纸模糊渐变开关
		blurRamp: {
			enable: {
				// 桌面端是否启用模糊渐变
				desktop: true,
				// 移动端是否启用模糊渐变
				mobile: true,
			},
		},
	},
};