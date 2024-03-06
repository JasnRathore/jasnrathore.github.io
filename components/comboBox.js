const comboBoxTemplate = document.createElement('template');
comboBoxTemplate.innerHTML = `
    <link rel="stylesheet" href="global.css" />
    <div id='container'>
    <button id='selector' class='bg-tertiarybkg border-none py-[1%] px-[2%] w-full rounded-md flex flex-row justify-between items-center drop-shadow-def'>
        <p id='text' class='pl-[6%]'><p> <image src='../assets/icons/caret-sort.svg' class='dark:invert'></image>
    </button>
    <div id='options' class=' hidden absolute w-full overflow-clip rounded-lg p-[5%] bg-tertiarybkg border-[0.1px] dark:border-white/30 border-black/30 z-0'>
        <slot />
    <div>
    </div>
`;

class comboBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.classList.add('relative');
        this.shadowRoot.appendChild(comboBoxTemplate.content.cloneNode(true));
        const options = this.shadowRoot.querySelector('#options').children[0].assignedElements();

        if (options.length === 0) {
            this.shadowRoot.querySelector('#selector').querySelector('#text').textContent = '';
        } else {
            const value = options[0].textContent;
            this.shadowRoot.querySelector('#selector').querySelector('#text').textContent = value;
        }
        this.toggelDarkMode();
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#selector').addEventListener('click', () => this.toggleOptions());
        document.addEventListener('click' , (event) => this.closeOptions(event));
        this.shadowRoot.addEventListener('optionselected', () => {console.log("recieved in combobox")})
        const options = this.shadowRoot.querySelector('#options').children[0].assignedElements();
        if (!(options.length === 0)) {
            options.forEach(option => {
                option.addEventListener('optionselected', (e) => {
                    const value = e.target.textContent;
                    this.shadowRoot.querySelector('#selector').querySelector('#text').textContent = value;
                    e.preventDefault();
                    this.toggleOptions();
                });
            });
        }
        document.documentElement.addEventListener('darkModeStatus', () => {
            this.toggelDarkMode();
        });
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#selector').removeEventListener('click');
        document.removeEventListener('click');
        this.shadowRoot.removeEventListener('optionselected');
        document.documentElement.removeEventListener('darkModeStatus');
    }is
    closeOptions(event) {
        const target = this.shadowRoot;
        const withinBoundaries = event.composedPath().includes(target);

        if (!withinBoundaries) {
            const options = target.querySelector('#options');
            if (!options.classList.contains('hidden')) {
                options.classList.add('hidden');
                options.classList.add("z-0");
                options.classList.remove("z-50");
            }
        }
    }

    toggleOptions() {
        const options = this.shadowRoot.querySelector('#options');
        if (options.classList.contains('hidden')) {
            options.classList.remove("z-0");
            options.classList.add("z-50");
            options.classList.remove('hidden');
        } else {
            options.classList.add("z-0");
            options.classList.remove("z-50");
            options.classList.add('hidden');
        }
    }
    toggelDarkMode() {
        const status = (document.documentElement.getAttribute('data-mode') === 'dark');
        if (status) {
            this.shadowRoot.querySelector('#container').setAttribute('data-mode','dark');
        } else {
            this.shadowRoot.querySelector('#container').setAttribute('data-mode', 'light');
        }
    }
}

window.customElements.define('combo-box', comboBox);
