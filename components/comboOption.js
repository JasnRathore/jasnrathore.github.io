const comboOptionTemplate = document.createElement('template');
comboOptionTemplate.innerHTML = `
    <link rel="stylesheet" href="./global.css" />
    <button class='bg-none hover:bg-selector w-full text-left p-[2%] rounded-md'><slot /></button>
`;

class comboOption extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(comboOptionTemplate.content.cloneNode(true));
    }
    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            const event = new Event("optionselected");
            this.dispatchEvent(event);
        });
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click');
        document.documentElement.removeEventListener('darkModeStatus');
    }
}

window.customElements.define('combo-option', comboOption);