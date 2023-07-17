const guessedLetters = document.querySelector (".guessed-letters");
const guessButton = document.querySelector (".guess");
const inputLetter = document.querySelector (".letter");
const wordProgress = document.querySelector (".word-in-progress");
const remainingGuesses = document.querySelector (".remaining");
const remainingGuessSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const playAgainButton = document.querySelector (".play-again-hide");

const word = "magnolia";

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
    const guess = inputLetter.value;
    console.log(guess);
    inputLetter.value = "";
});