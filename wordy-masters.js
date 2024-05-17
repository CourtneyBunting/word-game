const letters = document.querySelectorAll('.gameboard-letter');
const loadingDiv = document.querySelector('.info-bar');

async function init() {


//dont need name below, but helps with debugging later on
    document.addEventListener('keydown', function handleKeyPress(event) {
        const action = event.key;

        if (action === 'Enter') {
            commit();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase())
        } else {
            // do nothing
        }
    })
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

init();
