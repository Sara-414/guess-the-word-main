const guessedLettersElement = document.querySelector (".guessed-letters");
const guessButton = document.querySelector (".guess");
const inputLetter = document.querySelector (".letter");
const wordProgress = document.querySelector (".word-in-progress");
const remainingGuessesElement = document.querySelector (".remaining");
const remainingGuessSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const playAgainButton = document.querySelector (".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
  };

getWord();

// display ● as placeholders for letters to be guessed
const placeholder = function (word) {
    const placeholdLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholdLetters.push("●");
    }
    wordProgress.innerText = placeholdLetters.join("");
};

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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const wordReveal = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            wordReveal.push(letter.toUpperCase());
        } else {
            wordReveal.push("●");
        }
    }
    wordProgress.innerText = wordReveal.join("");
    validateWonGame();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, there is no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good job! The word contains a ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const validateWonGame = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});