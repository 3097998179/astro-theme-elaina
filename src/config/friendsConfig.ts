import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "缤果图床",
		imgurl:
			"https://job-manager-artifacts-online.cdn.bcebos.com/prod/artifacts/20015c4e-8e7f-4a32-8363-00f77e057c22/app-buyo3zgre5tt_web_1788791676950.png",
		desc: "简单易用的图床服务，满足您的所有图片托管需求",
		siteurl: "https://app-buyo3zgre5tt.appmiaoda.com/",
		tags: ["tool"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "缤果云盘",
		imgurl: "https://job-manager-artifacts-online.cdn.bcebos.com/prod/artifacts/1049d896-fcd8-47e5-b7f1-2d861dd33df1/app-c5hnez17ysjl_web_1789826583557.png",
		desc: "安全存储，随时随地访问您的文件",
		siteurl: "https://app-c5hnez17ysjl.appmiaoda.com/",
		tags: ["tool"],
		weight: 9,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 8,
		enabled: true,
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
