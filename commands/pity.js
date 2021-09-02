const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const { Card, User } = require('../models');
const colorMap = require('../src/colormap')
const shuffle = require('../src/shuffle')

const categories = ['hololive', 'genshin']

module.exports = {
  name: '$pity',
  description: 'newroll',
  async execute(msg, args) {

    if (!args[0]) {
      msg.reply('please enter a category to use your pity in! For example: \`$pity hololive\`')
      return
    }

    if (!categories.includes(args[0].toLowerCase())) {
      msg.reply('t-that category does not exist')
      return
    }

    User.findOne({ discordid: msg.author.id })
      .then(res => {
        let ownedCards = res.cards
        let ownedPity = res.pity
        if(ownedPity <= 20) {
            msg.reply(`y-you don't have enough pity saved up... you have ${ownedPity}`)
            return
        }
        Card.find({ category: args[0].toLowerCase(), rarity: 'UR' })
          .then(cards => {
            shuffle(cards)
            let rolledCard = cards[0]
            ownedCards.push(rolledCard)
            axios.put(`/api/users/update/${msg.author.id}`, {
              cards: ownedCards,
              pity: ownedPity -= 20
            })
              .then(() => {
                msg.channel.send(`> pity rolling for <@${msg.author.id}>... you are now at \`${ownedPity}\` pity`)

                setTimeout(() => {
                  const cardEmbed = new MessageEmbed()
                    .setColor(colorMap.get(`${rolledCard.rarity}`))
                    .addField(`${rolledCard.name}`, `${rolledCard.subname} (${rolledCard.rarity})`, true)
                    .setImage(`${rolledCard.image}`)
                    .setFooter(`Thanks for rolling with Yuzu! • id: ${rolledCard.id}`, 'https://i.imgur.com/AfFp7pu.png');
                  msg.reply({ embeds: [cardEmbed] })
                }, 3000)

              })
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }
}