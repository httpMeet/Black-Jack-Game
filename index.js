let player = {
    name: "Your Name",
    chips: 1000000
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let messagesEl = document.getElementById("messages-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Want to play a round?";
    } else if (sum === 21) {
        sum = 21;
        hasBlackJack = true;
    } else {
        sumEl.textContent = "Sum: " + " " + "Your total is: " + " " + sum;
        isAlive = false;
    }

    if (hasBlackJack === true) {
        messagesEl.textContent = "You Got a Blackjack! Your Total is: " + sum;
        player.chips = player.chips + 500;
    } else if (isAlive === false) {
        messagesEl.textContent = "Out Of the game! Because Your Total is: " + sum;
        player.chips = player.chips - 500;
    } else {
        messagesEl.textContent = "Do you want to draw a new Card?";
    }

    // Triggering a reflow before adding the fade-in class
    void messagesEl.offsetWidth;
    
    // Adding the fade-in class
    messagesEl.classList.add("fade-in");

    // Setting opacity to 1 after a short delay
    setTimeout(() => {
        messagesEl.style.opacity = 1;
    }, 100);

    playerEl.textContent = player.name + ": $" + player.chips;

    if (player.chips <= 0) {
        messagesEl.textContent = "You're out of chips! Game over.";
        isAlive = false;
    }

    if (hasBlackJack === true || isAlive === false) {
        cardsEl.textContent = "Cards: ";
        sumEl.textContent = "Sum: ";
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false && player.chips > 0) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    } else if (player.chips <= 0) {
        messagesEl.textContent = "You're out of chips! Game over.";
    }
}

// Event listener for the "START GAME" button
document.getElementById("start-button").addEventListener("click", startGame);

// Event listener for the "NEW CARD" button
document.getElementById("new-card-button").addEventListener("click", newCard);
