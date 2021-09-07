const { User } = require('../models')
const { MessageEmbed } = require('discord.js')
const colorMap = require('../src/colormap')

module.exports = {
    name: '$card',
    description: 'Show cards',
    execute(msg, args) {
        User.findOne({ discordid: msg.author.id })
            .populate('cards')
            .then(({ cards }) => {
                var has = false
                for (i = 0; i < cards.length; i++) {
                    if (cards[i].id === parseInt(args[0])) {
                        has = true
                        const cardEmbed = new MessageEmbed()
                            .setColor(colorMap.get(`${cards[i].rarity}`))
                            .addField(`${cards[i].name}`, `${cards[i].subname} (${cards[i].rarity})`, true)
                            .setImage(`${cards[i].image}`)
                            .setFooter(`card owned by ${msg.author.username}#${msg.author.discriminator}!`)
                        msg.reply({ embeds: [cardEmbed] })
                        break
                    }
                }
                has ? null : msg.reply("you don't have that card yet...")
            })
    }
}