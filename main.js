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

    function isLightColor(hex) {
        // Remove '#' if present
        hex = hex.replace(/^#/, "");

        // Convert 3-digit hex to 6-digit
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((char) => char + char)
                .join("");
        }

        // Parse RGB values
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // Calculate relative luminance
        let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Return true if light, false if dark
        return luminance > 0.5;
    }

    function renderColor(color) {
        const $item = document.createElement("button");
        $item.classList.add("color");
        console.debug("piecioshka", { color });
        if (isLightColor(color)) {
            $item.classList.add("is-light");
        }
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
        const filename = path.split("/").pop();
        const labelHTML = `
            <span class="name">${name}</span>
            <em class="filename">${filename}</em>
        `;
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
        $main = document.querySelector("#page");
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
