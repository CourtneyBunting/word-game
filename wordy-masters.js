const letters = document.querySelectorAll('.gameboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5; //in screaming case because it never changes

async function init() {
    let currentGuess = ''; //Has to be let because we are re-assigning it over and over, const doesn't work


    function addLetter (letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            //add letter to the end
            currentGuess += letter;
        } else {
            //replace teh last letter
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }
            //example: const string = 'BRIAN';
            //string.length == 5; 
            //string.charAt(0) = 'B'
            //string.charAt(4); = 'N' so its length - 1
        letters[currentGuess.length - 1].innerText = letter;
    }
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
