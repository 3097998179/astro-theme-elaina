/**
 * TOC 共享逻辑（无 DOM 依赖，服务端/客户端通用）
 *
 * 服务端：SidebarTOC.astro / FloatingTOC.astro 用 Astro 的 headings 计算目录项。
 * 客户端：TOCManager 用 DOM 遍历得到的 headings 计算目录项。
 * 两端都调用 computeTocItems，保证结构完全一致。
 */

export function renderTocItemHTML(item: TocItem): string {
	const escapedText = escapeHtmlAttr(item.text);
	const escapedHref = escapeHtmlAttr(item.href);
	const escapedHeadingId = escapeHtmlAttr(item.headingId);

	return `
        <a
          href="${escapedHref}"
          class="toc-item toc-level-${item.depthLevel}"
          data-heading-id="${escapedHeadingId}"
          aria-label="${escapedText}"
          title="${escapedText}"
        >
          <div class="toc-badge ${item.badgeKind === "index" ? "toc-badge-index" : ""}">
            ${renderBadgeInnerHTML(item)}
          </div>
          <div class="toc-label ${item.labelPrimary ? "toc-label-primary" : "toc-label-secondary"}">${escapedText}</div>
        </a>
      `;
}