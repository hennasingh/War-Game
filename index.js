
let deckId
 function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
    })
}

function generateCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data.cards)
        const container = document.getElementById('cards')
        
        container.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/>
        `
        container.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/>
        `


    })
}

document.getElementById("new-deck").addEventListener('click', handleClick)
document.getElementById('draw-cards').addEventListener('click', generateCards)

