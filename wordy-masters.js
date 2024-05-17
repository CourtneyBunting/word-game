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
    const wordParts = word.split("");
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

        const guessParts = currentGuess.split("");
        const map = makeMap(wordParts);

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            //mark as correct
            if (guessParts[i] === wordParts[i]) {
              letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");  
              map[guessParts[i]]--; //minuses the letter that has been guessed successfully
            }
        }

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i] === wordParts[i]) {
                //do nothing, we already did it
            } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
                //mark as close
                letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
                map[guessParts[i]]--;
            } else {
                letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
            }
        }

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

//returns how many of each letter in the word
function makeMap (array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        const letter = array[i]
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }

    return obj;
}

init();
