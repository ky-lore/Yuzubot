const { Card, User } = require('../models')

module.exports = {
    name: '$fav',
    description: 'Show cards',
    execute(msg, args) {

        User.findOne({ discordid: msg.author.id })
        .populate('favorites')
        .then(({ favorites }) => {
            console.log(favorites)
        })

    }
}