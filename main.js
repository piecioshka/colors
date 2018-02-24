(() => {
    const COPY_STATUS_DELAY = 300; // [ms]

    let $main = null;
    let $input = null;

    function copyToClipboard(string) {
        $input.value = string;
        $input.select();

        try {
            document.execCommand('copy');
            console.log('Copied to clipboard: %c' + string, 'color: #206d7e');
        } catch (err) {
            console.warn(err);
        }
    }

    function renderColor(color) {
        const $item = document.createElement('button');
        $item.classList.add('color');
        $item.style.backgroundColor = `#${color}`;
        $item.textContent = `#${color}`;
        $item.addEventListener('click', () => {
            $item.classList.add('active');
            setTimeout(() => $item.classList.remove('active'), COPY_STATUS_DELAY);
            copyToClipboard($item.textContent);
        });
        $main.appendChild($item);
    }

    function setup() {
        $main = document.querySelector('.page');
        $input = document.querySelector('.input-field');

        fetch('./colors.json')
            .then(response => response.json())
            .then((colors) => {
                colors.forEach(renderColor);
            });
    }

    window.addEventListener('DOMContentLoaded', setup, {
        passive: true,
        once: true
    });
})();
