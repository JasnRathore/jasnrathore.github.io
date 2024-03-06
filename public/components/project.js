const projectTemplate = document.createElement('template');
projectTemplate.innerHTML = `
    <link rel="stylesheet" href="global.css" />
    <div id='container' class='h-max flex flex-row justify-start items-center w-full gap-6 py-[1%] border-b-[0.1px] dark:border-white/30 border-slate-950/30'>
        <div class='flex flex-col w-full '>
            <div id='header' class='flex md:flex-row xs:flex-col justify-around'>
                <slot name='title' class="font-medium h-max"></slot>
                <slot name='logos' class='w-max'></slot>
            </div>
            <slot name='description' class="text-secondarytext text-ellipsis overflow-hidden" ></slot>
        </div>
        <a id='redirect' href='' target="_blank" class='w-[5%] h-full'>
            <image src='../assets/icons/external-link.svg' class='w-full dark:invert drop-shadow-def'></image>
        </a>
    </div>
`;

class projectElement extends HTMLElement {
    constructor() {
        super();
        // title, description, technologies
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(projectTemplate.content.cloneNode(true));
        const link = this.getAttribute('link')
        const redirect = this.shadowRoot.querySelector('#redirect');
        redirect.setAttribute('href',link);

        this.toggelDarkMode();
    }
    connectedCallback() {
        document.documentElement.addEventListener('darkModeStatus', () => {
            this.toggelDarkMode();
        });
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

window.customElements.define('project-element',projectElement);