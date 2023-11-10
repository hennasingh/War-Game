const newCards = document.getElementById('new-deck')
const drawCards = document.getElementById('draw-cards')
const remainingCards = document.getElementById('remaining-cards')
const cScore = document.getElementById('Cscore')
const yScore = document.getElementById('Yscore')
const winnerText = document.getElementById('winner')

let deckId
let computerScore = 0;
let meScore = 0;

const cards = {
    'ACE': 14,
    'KING' :13,
    'QUEEN': 12,
    'JACK': 11,
    '10':10,
    '9':9,
    '8':8,
    '7':7,
    '6':6,
    '5':5,
    '4':4,
    '3':3,
    '2':2,
    '1':1
}

 function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        remainingCards.textContent = data.remaining
    })
}

function generateCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {

        remainingCards.textContent = data.remaining
        const container = document.getElementById('cards')

        container.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/>
        `
        container.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/>
        `
        winnerText.textContent = findWinner(data.cards[0], data.cards[1])

        if(data.remaining == 0){
            drawCards.disabled = true
            if(computerScore > meScore)
                winnerText.textContent = "The Computer won the game!"
            else if(computerScore < meScore)
                winnerText.textContent = "You won the game!"
            else 
                winnerText.textContent = "It's a tie!"
        }

    })
}
function findWinner(card1, card2) {
    if (cards[card1.value] > cards[card2.value]) {
        computerScore +=1
        cScore.textContent = computerScore
        return "Computer wins!"       
    } else if(cards[card1.value] < cards[card2.value]) {
        meScore += 1
        yScore.textContent = meScore
        return "You win!"
    } else {
        return "WAR!"
    }
}

newCards.addEventListener('click', handleClick)
drawCards.addEventListener('click', generateCards)

