(() => {
    "use strict";

    const COPY_STATUS_DELAY = 300; // [ms]

    let $main = null;
    let $input = null;

    function copyToClipboard(string) {
        $input.value = string;
        $input.select();

        try {
            document.execCommand("copy");
            console.log("Copied to clipboard: " + string);
        } catch (err) {
            console.warn(err);
        }
    }

    function renderColor(color) {
        const $item = document.createElement("button");
        $item.classList.add("color");
        $item.style.backgroundColor = `#${color}`;
        $item.textContent = `#${color}`;
        $item.addEventListener("click", () => {
            $item.classList.add("active");
            setTimeout(
                () => $item.classList.remove("active"),
                COPY_STATUS_DELAY
            );
            copyToClipboard($item.textContent);
        });
        return $item;
    }

    async function applyColors(path) {
        const response = await fetch(path);
        const { palette, name, link } = await response.json();
        const $colorSets = document.createElement("div");
        $colorSets.classList.add("color-sets");
        $colorSets.dataset.title = name;
        const $title = document.createElement("h2");
        const labelHTML = `${name} <em>(${path
            .split("/")
            .pop()
            .replace(".json", "")})</em>`;
        if (link) {
            const $link = document.createElement("a");
            $link.href = link;
            $link.innerHTML = labelHTML;
            $link.setAttribute("target", "_blank");
            $title.append($link);
        } else {
            $title.innerHTML = labelHTML;
        }
        $colorSets.appendChild($title);
        palette.forEach((color) => {
            const $color = renderColor(color);
            $colorSets.appendChild($color);
        });
        $main.appendChild($colorSets);
    }

    async function setup() {
        $main = document.querySelector(".page");
        $input = document.querySelector(".input-field");

        await applyColors("./colors/misc.json");
        await applyColors("./colors/palette-adobe-1.json");
        await applyColors("./colors/palette-adobe-2.json");
        await applyColors("./colors/palette-adobe-3.json");
        await applyColors("./colors/palette-adobe-4.json");
        await applyColors("./colors/palette-adobe-5.json");
        await applyColors("./colors/palette-adobe-6.json");
        await applyColors("./colors/palette-adobe-7.json");
        await applyColors("./colors/palette-adobe-8.json");
        await applyColors("./colors/palette-adobe-9.json");
        await applyColors("./colors/palette-adobe-10.json");
        await applyColors("./colors/palette-adobe-11.json");
        await applyColors("./colors/palette-adobe-12.json");
        await applyColors("./colors/palette-adobe-13.json");
        await applyColors("./colors/palette-adobe-14.json");
        await applyColors("./colors/palette-adobe-15.json");
        await applyColors("./colors/palette-adobe-16.json");
        await applyColors("./colors/palette-adobe-17.json");
        await applyColors("./colors/palette-misc-1.json");
        await applyColors("./colors/palette-misc-2.json");
        await applyColors("./colors/palette-misc-3.json");
        await applyColors("./colors/palette-misc-4.json");
    }

    window.addEventListener("DOMContentLoaded", setup, {
        passive: true,
        once: true,
    });
})();
