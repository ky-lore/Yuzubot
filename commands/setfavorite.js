const { User } = require('../models')

function checkOwnedAndHandle(reqId, user) {

    User.findOne({ discordid: user })
        .populate('cards')
        .then(({ cards }) => {
            var checked = false
            cards.forEach(card => {
                if (card.id === parseInt(reqId)) {
                    checked = true
                }
            })
            checked ? isOwned(true) : isOwned(false)
        })
}

// FUNCTION WORKS JUST WRITE HANDLING LOGIC HERE
// FUNCTION WORKS JUST WRITE HANDLING LOGIC HERE
// FUNCTION WORKS JUST WRITE HANDLING LOGIC HERE
// FUNCTION WORKS JUST WRITE HANDLING LOGIC HERE
function isOwned(bool) {
    console.log(bool)
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