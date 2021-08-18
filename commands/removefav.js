const { User } = require('../models')
const axios = require('axios')


module.exports = {
    name: '$removefav',
    description: 'Show cards',
    execute(msg, args) {

        if (!args[0]) {
            msg.reply('please pick a card ID to remove a favorite!\nExample: ```$removefav 2```\nYou can view card IDs with ```$fav```')
            return
        }

        User.findOne({ discordid: msg.author.id })
            .populate('favorites')
            .then(({ favorites: favs }) => {
                axios.put(`/api/users/update/${msg.author.id}`,
                    {
                        favorites: favs.filter(card => card.id != parseInt(args[0]))
                    })
                msg.reply(`r-removed!`)
            })
    }
}