const guessedLettersElement = document.querySelector (".guessed-letters");
const guessButton = document.querySelector (".guess");
const inputLetter = document.querySelector (".letter");
const wordProgress = document.querySelector (".word-in-progress");
const remainingGuesses = document.querySelector (".remaining");
const remainingGuessSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const playAgainButton = document.querySelector (".play-again-hide");

const word = "magnolia";
const guessedLetters = [];

// display ● as placeholders for letters to be guessed
const placeholder = function (word) {
    const placeholdLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholdLetters.push("●");
    }
    wordProgress.innerText = placeholdLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = inputLetter.value;
    //console.log(guess);
    const properGuess = validateInput(guess);
    //console.log(properGuess);

    if (properGuess) {
        makeGuess(guess);
    }
    inputLetter.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
    return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};