export function scrollToHash(href: string) {
    // @ts-expect-error - lenis is attached to window by SmoothScrolling
    if (window.lenis) window.lenis.scrollTo(href);
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}
