const { User } = require('../models')
const { MessageEmbed } = require('discord.js')

const colorMap = new Map()

colorMap.set('UR', '#FE4365')
colorMap.set('SSR', '#FBB829')
colorMap.set('SR', '#BD228A')
colorMap.set('R', '#BAE4E5')

module.exports = {
    name: '$fav',
    description: 'Show cards',
    execute(msg, args) {

        User.findOne({ discordid: msg.author.id })
        .populate('favorites')
        .then(({ favorites }) => {
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