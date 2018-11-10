//Watched videos from Ryan Waite https://www.youtube.com/watch?v=oECVwum-7Zc

//Matthew Cranford https://matthewcranford.com/?s=memory+game



//Create a list that holds all of the cards

const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-camera-retro", "fa fa-leaf", "fa fa-camera-retro", "fa fa-bolt", "fa fa-bicycle",
    "fa fa-paper-plane-o", "fa fa-cube"
];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];


// timer variables
let timer, second, minutes;


// start a timer 
function startTimer() {
    timer = setInterval(displayTimer, 1000);

}

// Show the timer while the user plays 
function displayTimer() {
    seconds++;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (seconds >= 60) {
        minutes++;
        seconds = "00";
    }


    document.querySelector('.clock').innerHTML = "0" + minutes + ":" + seconds;
}


//Stop incrementing the timer
function stopTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
}

//Initialize Game


function init() {
    const shuffledIcons = shuffle(icons);
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        click(card);

        // call stop timer function
        stopTimer();
        start = false;


    }
}


//Click Event

var start = false;

function click(card) {

    //card click event
    card.addEventListener("click", function() {
        if (start == false) {
            stopTimer();
            startTimer();
            start = true;
        }
        const currentCard = this;
        const previousCard = openedCards[0];


        //we have an existing open card
        if (openedCards.length === 1) {


            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            //we should compare our two opened cards
            compare(currentCard, previousCard);

        } else {
            //we don't have any opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }

    });

}

//Compare two cards


function compare(currentCard, previousCard) {
    //Match
    if (currentCard.innerHTML === previousCard.innerHTML) {

        // Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //Add new move


        //check if the game is over
        isOver();

    } else {


        //Wait 500 ms, then do this
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");

        }, 500);

        openedCards = [];

    }
    addMove();
}


//Check if the game is over


function isOver() {
    if (matchedCards.length === icons.length) {
        function showModal() {
            const modal = document.querySelector('.modal-overlay');
            modal.style.display = 'block';
            modalStats();
        }
        showModal();
        stopTimer();
        start = false;
        alert("GAME OVER!");
    }

}

//Add move

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    //Set the rating
    rating();
}

// Star rating

const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
 <li><i class="fa fa-star"></i></li>
 <li><i class="fa fa-star"></i></li>`;

function rating() {

    if (17 < moves < 25) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
    } else if (moves > 25) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    } else {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
    }
}

//Restart Button

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    //Delete all cards
    cardsContainer.innerHTML = "";


    //Call Init to create new cardsContainer
    init();

    // Reset Any Related Variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>`;
});



// Start game for the first time
init();



// Shuffle function 
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Modal box help from https://www.youtube.com/watch?v=gLWIYk0Sd38


function modalStats() {
    const finalMoves = document.querySelector('.modal-moves');
    finalMoves.innerHTML = 'Moves: ' + moves.toString();
    const timeStat = document.querySelector('.modal-time');
    const finalTime = document.querySelector('.timer').innerHTML;
    timeStat.innerHTML = 'Time:' + finalTime.toString();
    const finalStars = document.querySelector('.modal-stars');
    const stars = numStars();
    finalStars.innerHTML = 'Stars' + stars.toString();
    stopTimer();
}

function numStars() {
    numStars();
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    const closed = document.querySelector('.closeBtn');
    closed.addEventListener('click', closeModal);
    modal.style.display = 'none';
}

closeModal();