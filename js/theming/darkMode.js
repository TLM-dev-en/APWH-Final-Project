import createHTMLElement from "../backend/universal.js";

const topBar = document.getElementById('top-bar');

function darkModeLogic() {
    const darkModeButton = createHTMLElement(
        'button',
        'dark-mode-button',
        null,
        'Toggle Dark Mode',
        topBar
    )

    darkModeButton.addEventListener('click', () => {
        toggleDarkMode()
    });


    caching()
}

function caching() {
    if (localStorage.getItem('darkMode') === 'false') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    };
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

export default darkModeLogic;