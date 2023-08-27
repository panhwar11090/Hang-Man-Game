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
// getRandomWords();

let words = ["sale","love"];
// let wordApi = getRandomWords(); 

// const words = ["bad","no"];
// select a word at random from words array
let selectedWord= words[Math.floor(Math.random()*words.length)];


// Tracking arrays for correct and incorrect guess
const correctLetterArray = [];
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

// Function to show notificatio
function showNotification(){
    //Add class show to the notification container
    notification.classList.add('show');
    // After 2 seconds hiding it
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Function to update incorrect letters
function updateIncorrectLetter(){
    // Display the incorrect letters
    incorrectLetters.innerHTML=`
        ${incorrectLetterArray.length > 0 ? '<p>Incorrect Letters</p>' : ''}
        ${incorrectLetterArray.map(letter => `<span>${letter}</span>`)}
    `;
    //Display the hangman part
    figureParts.forEach((part , index) =>{
        //How many incorrect letters has the user gussed
        const errors = incorrectLetterArray.length;
        if(index < errors){
            part.style.display = 'block';
        } else{
            part.style.display = 'none';
        }
    });
    // check if user lostr
    if (incorrectLetterArray.length === figureParts.length ) {
        finalMessage.innerText = 'You Lost'
        popup.style.display = 'flex';
    }
}

// Event Handler
//1 Listen for keyboar key press
window.addEventListener('keydown', e =>{
    //check if key pressed is a letter a = 65 to z =90
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        // Check if letter is in the selected word
        if(selectedWord.includes(letter)){
            // check if leter is alredy in correctletter array
            if(!correctLetterArray.includes(letter)){
                // add leter into the correct array
                correctLetterArray.push(letter);
                // run the dispalyword fucntion again to display new lette
                displayWord();
            } else{
                showNotification();
            }
        }else{
            //check if letter is alredy in incorrext Array
            if(!incorrectLetterArray.includes(letter)){
                // add letter inot the inncorect array
                incorrectLetterArray.push(letter);
                // update the incorretc letter ui
                updateIncorrectLetter();
            } else{
                showNotification();
            }
        }
    }
});

// 2. Listen for click on play again button
playBtn.addEventListener('click', () => {
    // Empty correctLettersArray & incorrectLettersArray
    correctLetterArray.splice(0);
    incorrectLetterArray.splice(0);
    // Select a new random word
    selectedWord = words[Math.floor(Math.random() * words.length)];
    // Clear incorrect letters display
    updateIncorrectLetter();
    // Hide the popup
    popup.style.display = 'none';
    // refresh displayed word
    displayWord();
    getRandomWords();
})


displayWord();


async function getRandomWords(){
    const res = await fetch('https://random-word-api.herokuapp.com/word?lang=it');
    const data = await res.json();
    
    const newWords = data;
    words.length = 0;
    words.push(...newWords);   
    console.log(newWords);
}



