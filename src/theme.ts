import { State } from "@9elt/miniframe";

const theme = new State(
    localStorage.getItem("theme") || (
        (typeof window.matchMedia === "function"
            && window.matchMedia("(prefers-color-scheme: light)").matches)
            ? "light" : "dark"
    )
);

theme.sub((theme) => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
})(theme.value, theme.value);

document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        // @ts-ignore
        theme.value = btn.dataset && btn.dataset.theme || "light";
    });
});
