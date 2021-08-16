const { User, Card } = require('../models')
const axios = require('axios')

function checkOwnedAndHandle(reqId, user) {
    User.findOne({ discordid: user })
        .populate('cards')
        .then(({ cards }) => {
            var check = false
            cards.forEach(card => {
                if (card.id === parseInt(reqId)) {
                    check = true
                }
            })
            check ? isOwned(reqId, user) : isOwned(false)
        })
}

function isOwned(cardId, user) {
    console.log(cardId, user)

    var favCards = []

    User.findOne({ discordid: user })
        .then(({ favorites }) => {
            favorites.forEach(fav => {
                favCards.push(fav)
                console.log(favCards)
            })
        })

    Card.findOne({ id: cardId })
        .then(card => {
            favCards.push(card)
            axios.put(`/api/users/update/${user}`, { favorites: favCards })
            // User.updateOne({ discordid: user }, { favorites: favCards })
        })
    // User.findOneAndUpdate({ discordid: user })

}

module.exports = {
    name: '$setfav',
    description: 'Show cards',
    execute(msg, args) {

        if (!args[0]) {
            msg.reply('please pick a card ID to set a favorite!\nExample: ```$setfav 2```\nYou can view card IDs with ```$showcards <rarity>```')
            return
        }

        checkOwnedAndHandle(args[0], msg.author.id)
    }
}