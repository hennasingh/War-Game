
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
        let display= ``
        data.cards.forEach(card => {
            display += `
            <img src="${card.image}">
        `
        })
        document.getElementById('cards').innerHTML+= display

    })
}

document.getElementById("new-deck").addEventListener('click', handleClick)
document.getElementById('draw-cards').addEventListener('click', generateCards)

