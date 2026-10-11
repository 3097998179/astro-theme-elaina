---
title: 给博客加一个点击飘爱心效果
published: 2026-10-13
description: 用原生 JavaScript 和 SVG 实现点击页面飘出立体爱心的小动画，记录思路、关键代码与参数说明。
image: "./images/index3.avif"
tags: [JavaScript, SVG, 前端, 折腾记录]
category: 魔法书
slug: click-heart-effect
series: "博客折腾记"
seriesOrder: 1
---

# 给博客加一个点击飘爱心效果

> 用原生 JavaScript 和 SVG 实现点击页面飘出立体爱心的小动画。

逛别人博客时看到过一个效果：点击页面任意位置，会飘出几颗爱心，慢慢上升、散开、消失。挺好看的，也想给自己的站加一个。

![点击飘爱心效果](./images/index3(1).avif)

这篇文章记录实现思路、关键代码和踩过的坑。

## 想要的效果

- 点击页面任意位置，冒出 2～3 颗爱心
- 爱心有大小、颜色、形状的随机差异
- 缓慢上升，同时左右飘动、旋转、淡出
- 不挡点击，不占布局，自动清理

## 整体思路

核心就三步：

1. 监听 `click`（和移动端 `touchstart`）
2. 在点击位置创建一个绝对定位的爱心元素
3. 用 CSS `transition` 让它飘走，动画结束后删掉

关键在于**用 CSS 过渡而不是 JS 逐帧计算**，性能更好，代码也更简单。

## 爱心怎么画

不用图片，直接用内联 SVG。好处是：

- 可以随 `width` / `height` 缩放
- 颜色用 `currentColor`，JS 里改 `color` 就行
- 加一层径向渐变高光，看起来有立体感

```html
<svg viewBox="0 0 32 32" width="100%" height="100%">
  <defs>
    <radialGradient id="g1" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <path d="M16 28 C7.5 21 0 13 0 7.5 ..." fill="currentColor"/>
  <path d="M16 28 C7.5 21 0 13 0 7.5 ..." fill="url(#g1)"/>
</svg>
```

第一条 `path` 是爱心本体，用 `currentColor`；第二条叠一层白色径向渐变，模拟高光。

准备 3 个形状略有差异的模板，随机取一个，避免每次都是同一颗心。

## 参数总表

| 参数 | 位置 | 默认值 | 作用 |
| :--- | :--- | :--- | :--- |
| `size` | 创建时 | 18～34 | 爱心尺寸（px） |
| `color` | 创建时 | 15 色随机 | 爱心颜色 |
| `template` | 创建时 | 3 模板随机 | 爱心形状 |
| `opacity` 初始 | 创建时 | 0.9 | 起始不透明度 |
| `scale` 初始 | 创建时 | 0.5 | 起始缩放 |
| `rotate` 初始 | 创建时 | 0 | 起始旋转角度 |
| `transition` 时长 | 创建时 | 2.2～3.2s | 动画持续时间 |
| `transition` 缓动 | 创建时 | ease-out | 动画速度曲线 |
| `xDrift` | 动画时 | -50～50 | 水平漂移距离（px） |
| `yDistance` | 动画时 | 120～200 | 上升距离（px） |
| `rotate` 结束 | 动画时 | -35～35 | 结束旋转角度 |
| `scale` 结束 | 动画时 | 1.15 | 结束缩放 |
| `opacity` 结束 | 动画时 | 0 | 结束不透明度 |
| `count` | 每次点击 | 2 或 3 | 每次冒出几颗 |
| `offX` / `offY` | 每次点击 | -7～7 | 每颗的随机偏移（px） |
| `zIndex` | 创建时 | 99999 | 层级 |
| 清理超时 | 创建时 | 4000ms | 兜底删除时间 |

## 逐参数详解

### 爱心尺寸 size

```javascript
var size = randomRange(18, 34);
```

范围 18～34px。太小看不清，太大容易挡住正文。

- 18px：接近小图标，适合密集点击
- 34px：比较显眼，适合稀疏场景

觉得整体偏小，调高到 22～40；偏大就降到 14～28。

### 颜色 colors

```javascript
var colors = [
    '#ff6b81','#ff4757','#ff6348','#ff7f50','#ff1493',
    '#ff69b4','#ffb6c1','#ff9a9e','#fbc2eb','#ffafbd',
    '#ffb3ba','#ffc3a0','#ffd1d1','#ffa07a','#ff85a2'
];
```

15 个粉红/珊瑚色系，全部偏暖，和爱心形状搭配。

想换风格：

- **灰之诗旅配色**：换成灰白 + 雾蓝 + 星金，比如 `['#8A9BA8','#D4AF37','#F5F3EF','#B8C4CC']`
- **单色**：只留一个色，更克制
- **彩虹**：用 HSL 动态生成，`hsl(${Math.random()*360}, 80%, 70%)`

### 形状模板 heartTemplates

3 个 SVG，差别在渐变位置和路径弧度：

- `g1`：渐变中心在 `50% 30%`，高光偏上
- `g2`：渐变中心在 `40% 30%`，高光偏左上
- `g3`：渐变中心在 `50% 25%`，高光更靠上

随机取一个，避免所有爱心长得一模一样。

### 初始状态

```javascript
heart.style.opacity = '0.9';
heart.style.transform = 'translate(0, 0) scale(0.5) rotate(0deg)';
```

- **`opacity: 0.9`**：不是 1，留一点透明，看起来更轻盈
- **`scale(0.5)`**：从半大开始，飘的过程中放大到 1.15，有「绽放」感
- **`rotate(0deg)`**：从正立开始，结束时随机旋转

### 动画时长 transition

```javascript
heart.style.transition = 'all ' + randomRange(2.2, 3.2).toFixed(2) + 's ease-out';
```

范围 2.2～3.2 秒。这是最影响观感的参数。

- **1 秒以内**：太快，像弹出而不是飘出
- **2～3 秒**：推荐的「慢速优雅」区间
- **5 秒以上**：太慢，点多了屏幕上全是爱心，显得乱

`ease-out` 让速度逐渐变慢，比 `linear` 更自然。其他可选：

- `ease`：默认缓动，中规中矩
- `ease-in-out`：两头慢中间快，飘动感更强
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)`：更细腻的减速曲线

### 水平漂移 xDrift

```javascript
var xDrift = randomRange(-50, 50);
```

范围 -50～50px。正值向右，负值向左。

- **0**：垂直上升，很呆板
- **±20**：轻微摆动
- **±50**：明显飘逸，推荐值
- **±100 以上**：飘得太远，像被风吹走

### 上升距离 yDistance

```javascript
var yDistance = randomRange(120, 200);
```

范围 120～200px。注意是负值应用，即向上飘。

- **80 以下**：上升不明显，像原地抖动
- **120～200**：推荐区间，有上升感但不夸张
- **300 以上**：飘出屏幕外太快，还没看清就没了

### 结束旋转 rotate

```javascript
var rotate = randomRange(-35, 35);
```

范围 -35～35 度。正值顺时针，负值逆时针。

- **0**：不旋转，规整但单调
- **±35**：轻微倾斜，有生气
- **±90 以上**：像在翻滚，太夸张

### 结束缩放 scale

```javascript
heart.style.transform = '... scale(1.15) ...';
```

从 0.5 放大到 1.15。放大过程本身也是一种「绽放」暗示。

- **1.0**：不变大，中规中矩
- **1.15**：略微放大，推荐
- **1.5 以上**：膨胀感太强，像气球

### 每次点击数量 count

```javascript
var count = Math.random() < 0.35 ? 3 : 2;
```

- 35% 概率出 3 颗，65% 概率出 2 颗
- 不固定数量，避免每次都一样

想更热闹：改成 `Math.random() < 0.5 ? 5 : 3`，每次 3～5 颗。  
想更克制：改成固定 1 颗。

### 随机偏移 offX / offY

```javascript
var offX = randomRange(-7, 7);
var offY = randomRange(-7, 7);
```

范围 -7～7px。让同一位置的几颗爱心不完全重叠。

- **0**：全部叠在点击点，看起来像一颗
- **±7**：轻微散开，推荐
- **±20 以上**：散得太开，不像同一处冒出

### 层级 zIndex

```javascript
heart.style.zIndex = '99999';
```

保证爱心在最上层。如果你的站有更高的元素（比如模态框 `z-index: 100000`），调到比它更高即可。

### 清理超时

```javascript
heart.addEventListener('transitionend', function() {
    if (heart.parentNode) heart.remove();
});
setTimeout(function() {
    if (heart.parentNode) heart.remove();
}, 4000);
```

- **`transitionend`**：动画结束立即删除，主清理
- **`setTimeout(4000)`**：兜底，防止切标签页等导致 `transitionend` 不触发

超时时间要**大于动画最长时间**（3.2 秒），留一点余量。设 4000ms 是安全的。

### 点击与移动端

```javascript
document.addEventListener('click', burstHearts);
document.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        var t = e.touches[0];
        burstHearts({ clientX: t.clientX, clientY: t.clientY });
    }
}, { passive: true });
```

- **`click`**：桌面端
- **`touchstart`**：移动端，比 `click` 响应快
- **`{ passive: true }`**：告诉浏览器不会 `preventDefault`，滚动更流畅
- **`e.touches.length === 1`**：单指才触发，双指缩放不触发

### 双层 requestAnimationFrame

```javascript
requestAnimationFrame(function() {
    requestAnimationFrame(function() {
        // 改 transform
    });
});
```

确保浏览器**先渲染初始状态**，再改 `transform`，过渡才会生效。

只写一层有时会因为同帧合并而看不到动画。替代方案是强制读一次 `offsetWidth`。

## 完整代码

::: code-group labels=[完整脚本]

```javascript
(function(){
    var heartTemplates = [
        '<svg viewBox="0 0 32 32" width="100%" height="100%">' +
        '<defs><radialGradient id="g1" cx="50%" cy="30%" r="50%">' +
        '<stop offset="0%" stop-color="white" stop-opacity="0.8"/>' +
        '<stop offset="100%" stop-color="white" stop-opacity="0"/>' +
        '</radialGradient></defs>' +
        '<path d="M16 28 C7.5 21 0 13 0 7.5 C0 3.5 4 0 9 0 C12 0 14.5 2.5 16 6 C17.5 2.5 20 0 23 0 C28 0 32 3.5 32 7.5 C32 13 24.5 21 16 28Z" fill="currentColor"/>' +
        '<path d="M16 28 C7.5 21 0 13 0 7.5 C0 3.5 4 0 9 0 C12 0 14.5 2.5 16 6 C17.5 2.5 20 0 23 0 C28 0 32 3.5 32 7.5 C32 13 24.5 21 16 28Z" fill="url(#g1)"/></svg>',
        '<svg viewBox="0 0 32 32" width="100%" height="100%">' +
        '<defs><radialGradient id="g2" cx="40%" cy="30%" r="50%">' +
        '<stop offset="0%" stop-color="white" stop-opacity="0.9"/>' +
        '<stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs>' +
        '<path d="M16 27 C8 20 2 13 2 8 C2 4 5 1 9 1 C12 1 14 3.5 16 6.5 C18 3.5 20 1 23 1 C27 1 30 4 30 8 C30 13 24 20 16 27Z" fill="currentColor"/>' +
        '<path d="M16 27 C8 20 2 13 2 8 C2 4 5 1 9 1 C12 1 14 3.5 16 6.5 C18 3.5 20 1 23 1 C27 1 30 4 30 8 C30 13 24 20 16 27Z" fill="url(#g2)"/></svg>',
        '<svg viewBox="0 0 32 32" width="100%" height="100%">' +
        '<defs><radialGradient id="g3" cx="50%" cy="25%" r="45%">' +
        '<stop offset="0%" stop-color="white" stop-opacity="0.85"/>' +
        '<stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs>' +
        '<path d="M16 27.5 C8.5 21 1 13.5 1 8.5 C1 4.5 4.5 1 9 1 C12.5 1 14.5 3 16 6.5 C17.5 3 19.5 1 23 1 C27.5 1 31 4.5 31 8.5 C31 13.5 23.5 21 16 27.5Z" fill="currentColor"/>' +
        '<path d="M16 27.5 C8.5 21 1 13.5 1 8.5 C1 4.5 4.5 1 9 1 C12.5 1 14.5 3 16 6.5 C17.5 3 19.5 1 23 1 C27.5 1 31 4.5 31 8.5 C31 13.5 23.5 21 16 27.5Z" fill="url(#g3)"/></svg>'
    ];

    var colors = [
        '#ff6b81','#ff4757','#ff6348','#ff7f50','#ff1493',
        '#ff69b4','#ffb6c1','#ff9a9e','#fbc2eb','#ffafbd',
        '#ffb3ba','#ffc3a0','#ffd1d1','#ffa07a','#ff85a2'
    ];

    function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function randomRange(min, max) { return Math.random() * (max - min) + min; }

    function createHeart(x, y) {
        var size = randomRange(18, 34);
        var color = randomItem(colors);
        var template = randomItem(heartTemplates);

        var heart = document.createElement('span');
        heart.innerHTML = template;
        heart.style.position = 'fixed';
        heart.style.left = (x - size/2) + 'px';
        heart.style.top  = (y - size/2) + 'px';
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '99999';
        heart.style.userSelect = 'none';
        heart.style.color = color;
        heart.style.filter = 'drop-shadow(0 2px 6px rgba(255,105,135,0.5))';
        heart.style.opacity = '0.9';
        heart.style.transform = 'translate(0, 0) scale(0.5) rotate(0deg)';
        heart.style.transition = 'all ' + randomRange(2.2, 3.2).toFixed(2) + 's ease-out';

        document.body.appendChild(heart);

        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                var xDrift = randomRange(-50, 50);
                var yDistance = randomRange(120, 200);
                var rotate = randomRange(-35, 35);
                heart.style.transform = 'translate(' + xDrift + 'px, -' + yDistance + 'px) scale(1.15) rotate(' + rotate + 'deg)';
                heart.style.opacity = '0';
            });
        });

        heart.addEventListener('transitionend', function() {
            if (heart.parentNode) heart.remove();
        });
        setTimeout(function() {
            if (heart.parentNode) heart.remove();
        }, 4000);
    }

    function burstHearts(e) {
        var count = Math.random() < 0.35 ? 3 : 2;
        for (var i = 0; i < count; i++) {
            var offX = randomRange(-7, 7);
            var offY = randomRange(-7, 7);
            createHeart(e.clientX + offX, e.clientY + offY);
        }
    }

    document.addEventListener('click', burstHearts);
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            var t = e.touches[0];
            burstHearts({ clientX: t.clientX, clientY: t.clientY });
        }
    }, { passive: true });
})();
```

:::

> [!TIP] 放到哪里
> 整段代码可以直接贴到主题的全局脚本注入位置，或者包一层 `<script>` 放进 `MainGridLayout` 之类的公共布局里，全站生效。

## 踩过的坑

### 1. 动画不生效

第一次写的时候直接在 `appendChild` 后改 `transform`，结果爱心一闪就没了，没有过渡。

原因：浏览器把「创建」和「改样式」合并到同一帧，没有中间状态。

解决：用两层 `requestAnimationFrame`，或者强制读一次 `offsetWidth`。

### 2. 爱心挡住链接

忘了加 `pointer-events: none`，结果点链接时爱心盖在上面，点不动。

### 3. 元素堆积

一开始没清理，快速点几十下之后 DOM 里全是爱心，页面开始卡。

加了 `transitionend` + `setTimeout` 双保险后解决。

### 4. 过渡时间太长

最初设了 5 秒，爱心飘得慢是慢了，但点多了之后屏幕上一直有东西在动，显得乱。

最后定在 2.2～3.2 秒，配合 `ease-out`，观感比较舒服。

## 参数调节速查

| 想要的效果 | 改哪个参数 |
| :--- | :--- |
| 爱心更大 | `size` 上限调高 |
| 爱心更小 | `size` 下限调低 |
| 飘得更快 | `transition` 时长调低 |
| 飘得更慢 | `transition` 时长调高 |
| 飘得更远 | `yDistance` 调高 |
| 飘得更散 | `xDrift` 调大 |
| 旋转更多 | `rotate` 范围扩大 |
| 一次更多 | `count` 概率和数量调高 |
| 一次更少 | `count` 固定 1 |
| 换配色 | `colors` 数组替换 |
| 换形状 | `heartTemplates` 替换 |

## 要不要加到自己的站

加之前想清楚两点：

- **是否影响阅读**：爱心是点缀，不能抢正文的注意力。
- **是否拖性能**：单个元素很轻，但如果一篇文章读者点了上百次，就需要节流。

我目前没加节流，因为正常阅读不会狂点。如果你的站互动量大，可以加个每秒最多触发几次的限制。

## 写在最后

整个效果不到 100 行，核心就是「创建一个元素，改它的 `transform` 和 `opacity`，等它消失」。

原生 JS + CSS 过渡能解决的问题，没必要上动画库。

如果你也想加，直接复制上面的代码，按参数总表调一调就行。

—— 殇恋
