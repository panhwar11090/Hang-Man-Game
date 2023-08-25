// Get the Dom Elements

const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letter');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

//Get the dom elements for gangman
const figureParts = document.querySelectorAll('.figure-part');

// this is the pool

const words = ["tightly","sale","skin","blow","among","route",
"meant","fox","region","wall","develop","avoid",
"bound","born","feel","lift","kitchen","wheel",
"death","smaller","people","fog","suit","hurried",
"operation","apple","bat","police","farm","evening",
"price","slight","brave","cotton","finest","attempt",
"hospital","carefully","rain","respect","red","jump"];

// const words = ["bad","no"];
// select a word at random from words array
let selectedWord= words[Math.floor(Math.random()*words.length)];


// Tracking arrays for correct and incorrect guess
const correctLetterArray = ['a','b','c','d','e','f'];
const incorrectLetterArray = [];

// function to display the selected word in the dom
function displayWord(){
    // display the selected word
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter" >
                    ${correctLetterArray.includes(letter) ? letter : '' }
                </span>
                `
            )
            .join('')
        }
    `;
    // Replace new line character and form inner word
    const innerWord = word.innerText.replace(/\n/g, '');
    // Comapre inner word to selected word if it is matched
    if(innerWord === selectedWord){
        finalMessage.innerText='Congratulation! YOU WON!';
        popup.style.display = 'flex';
    }
};




displayWord();