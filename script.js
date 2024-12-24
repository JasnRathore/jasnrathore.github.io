// On page load or when changing themes, best to add inline in `head` to avoid FOUC

// Whenever the user explicitly chooses light mode
//localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
//localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
//localStorage.removeItem('theme')


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-mode', 'dark')
} else {
    document.documentElement.setAttribute('data-mode', 'light')
}

function classChangedCallback(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-mode') {
            const darkModeStatus = new Event('darkModeStatus');
            document.documentElement.dispatchEvent(darkModeStatus);
        }
    }
}

function test() {
    console.log('jack');
}

const observer = new MutationObserver(classChangedCallback);

observer.observe(document.documentElement, { attributes: true });

