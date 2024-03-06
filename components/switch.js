const switchTemplate = document.createElement('template');
switchTemplate.innerHTML = `
<link rel="stylesheet" href="global.css" />
<div id='container' class='h-[28px] w-[50px] rounded-full cursor-pointer'>
<div id='switch' class='bg-tertiarybkg rounded-full flex items-center h-full'>
    <div id='slider' class=' bg-primarybkg flex items-center justify-center h-[75%] aspect-square rounded-full transition-transform duration-100 translate-x-[10%]'>
        <image id='icon' src='./assets/icons/moon.svg' class='dark:invert size-3/5' alt='icon'></image>
    </div>
</div>
</div>
`;

class roundedSwitch extends HTMLElement {
    constructor() {
        super();
        this.setAttribute('active','false');
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(switchTemplate.content.cloneNode(true));
        this.toggelDarkMode();
    }
    connectedCallback() {
        this.shadowRoot.querySelector("#switch").addEventListener("click", (e) => {
            let currentValue = this.getAttribute('active');
            if (currentValue === 'false') {
                this.toggleSwitchTo('true');
                document.documentElement.setAttribute('data-mode','light')

            } else if (currentValue === 'true') {
                this.toggleSwitchTo('false');
                document.documentElement.setAttribute('data-mode','dark')
            }
        });
        document.documentElement.addEventListener('darkModeStatus', () => {
            this.toggelDarkMode();
        });
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("#switch").removeEventListener();
        document.documentElement.removeEventListener('darkModeStatus');
    }
    toggleSwitchTo(state) {
        const icon = this.shadowRoot.querySelector('#icon');
        const slider = this.shadowRoot.querySelector('#slider');
        if (state === 'true') {
            this.setAttribute('active','true');
            slider.classList.remove('translate-x-[10%]');
            slider.classList.add('translate-x-[130%]');
            icon.setAttribute('src','../assets/icons/sun.svg');
        } else if (state === 'false') {
            this.setAttribute('active','false');
            slider.classList.remove('translate-x-[130%]');
            slider.classList.add('translate-x-[10%]');
            icon.setAttribute('src','../assets/icons/moon.svg');
        }

    }
    toggelDarkMode() {
        const status = (document.documentElement.getAttribute('data-mode') === 'dark');
        if (status) {
            this.shadowRoot.querySelector('#container').setAttribute('data-mode','dark');
            this.toggleSwitchTo("false");
        } else {
            this.shadowRoot.querySelector('#container').setAttribute('data-mode', 'light');
            this.toggleSwitchTo("true");
        }
    }
}

window.customElements.define('rounded-switch', roundedSwitch);