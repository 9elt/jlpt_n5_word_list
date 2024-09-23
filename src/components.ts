import { createNode } from "@9elt/miniframe";
import { Word } from "./list";

export function Title(word: Word) {
    return createNode({
        tagName: "h2",
        className: "title",
        children: [word.id],
    });
}

export function Handle(word: Word, title: HTMLElement) {
    return createNode({
        // @ts-ignore
        tagName: "li",
        children: [word.id],
        onClick: () => window.scrollTo({
            top: title.offsetTop - 150,
            behavior: "smooth"
        }),
    });
}

export function Entry(word: Word) {
    return createNode({
        tagName: "li",
        className: "entry-" + word.id,
        children: [
            word.hiragana,
            word.kanji && {
                tagName: "a",
                className: "kanji",
                href: "https://jisho.org/search/" + encodeURIComponent(word.kanji),
                target: "_blank",
                children: [word.kanji],
            },
            word.frequency && {
                tagName: "span",
                className: "freq",
                children: ["(", word.frequency, ")"],
            },
            word.examples && {
                tagName: "pre",
                className: "examples",
                children: [word.examples],
            }
        ],
    });
}
