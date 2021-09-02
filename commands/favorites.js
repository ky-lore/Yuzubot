const { User } = require('../models')
const { MessageEmbed } = require('discord.js')

const colorMap = require('../src/colormap')


module.exports = {
    name: '$fav',
    description: 'Show cards',
    execute(msg, args) {

        User.findOne({ discordid: msg.author.id })
        .populate('favorites')
        .then(({ favorites }) => {
            console.log(favorites)
            favorites.forEach((card, i) => {
                const cardEmbed = new MessageEmbed()
                    .setColor(colorMap.get(`${card.rarity}`))
                    .addField(`${card.name}`, `${card.subname} (${card.rarity})`, true)
                    .setImage(`${card.image}`)
                    .setFooter(`${msg.author.username}'s favorites! (${i+1}/5) id: ${card.id}`)
                msg.reply({ embeds: [cardEmbed] })
            })
        })
    }
}