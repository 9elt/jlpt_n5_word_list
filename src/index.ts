import { Entry, Handle, Title } from "./components";
import { LIST } from "./list";
import "./search";
import "./theme";

const ul = document.querySelector("ul#list")!;
const index = document.querySelector("ul#indexes")!;

for (const word of LIST) {
    if (typeof word.id === "string") {
        const title = Title(word);
        ul.append(title);

        const handle = Handle(word, title);
        index.append(handle);
    }
    else {
        ul.append(
            Entry(word)
        );
    }
}
