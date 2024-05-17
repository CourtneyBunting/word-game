const letters = document.querySelectorAll('.gameboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5; //in screaming case because it never changes

async function init() {
    let currentGuess = ''; //Has to be let because we are re-assigning it over and over, const doesn't work
    let currentRow = 0;

    //Gets word of the Day
    //res is short for response, add ?random=1 for a new word each time istead of just word of the day
    const res = await fetch("https://words.dev-apis.com/word-of-the-day"); 
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    setLoading(false);

    console.log(word)
    

    function addLetter (letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            //add letter to the end
            currentGuess += letter;
        } else {
            //replace the last letter
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }
            //example: const string = 'BRIAN';
            //string.length == 5; 
            //string.charAt(0) = 'B'
            //string.charAt(4); = 'N' so its length - 1
        letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
    }

    async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            //Do Nothing
            return;
        } 

        // TODO validate the word

        // TODO do all the marking as "correct" "close" or "wrong"

        // TODO did they win or lose?

        currentRow++;
        currentGuess = '';

        function backspace() {
            currentGuess = currentGuess.substring(0, currentGuess.length - 1);
            letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
        }

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

function setLoading(isLoading) {
    loadingDiv.classList.toggle('show', isLoading);
}
init();
