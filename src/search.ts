import { State } from "@9elt/miniframe";
import { LIST } from "./list";

const search = new State<string | number | null>(null);

const form = document.getElementById('search')!;
const input = document.getElementById("search-val")!;

let i = 0;

input.addEventListener("input", (e) => {
    // @ts-ignore
    let value = e.target.value.trim();
    value = /^\d+/.test(value)
        && parseInt(value) < (LIST[LIST.length - 1].id as unknown as number)
        ? parseInt(value)
        : value || null;

    i++;
    setTimeout(() => {
        if (--i === 0) {
            search.value = value;
        }
    }, 500);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    i++;
    setTimeout(() => {
        if (--i === 0) {
            search.value = search.value;
        }
    }, 500);
});

let lastFound = 0;

search.sub((value) => {
    if (typeof value === "string") {
        for (let i = lastFound; i < LIST.length; i++) {
            const word = LIST[i];

            if (
                word.hiragana && word.hiragana.includes(value) ||
                (word.examples && word.examples?.includes(value)) ||
                (word.kanji && word.kanji.includes(value))
            ) {
                scrollToId(word.id as unknown as number);
                lastFound = i;
                return;
            }
        }
    }
    else if (value === null) {
        // error
    }
    else if (typeof value === "number") {
        scrollToId(value);
    }

    lastFound = 0;
});

function scrollToId(wordId: number) {
    const elem = document.querySelector(".entry-" + wordId)! as HTMLLIElement;

    elem.style.backgroundColor = "#61a3493a";

    window.scrollTo({
        top: elem.offsetTop - 150,
        behavior: "smooth"
    });

    setTimeout(() => {
        elem.style.backgroundColor = "transparent";
    }, 2_500);
}
