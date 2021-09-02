const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const { Card, User } = require('../models');
const colorMap = require('../src/colormap')
const rng = require('../src/rng')
const shuffle = require('../src/shuffle')

const categories = ['hololive', 'genshin']

module.exports = {
  name: '$roll',
  description: 'newroll',
  async execute(msg, args) {

    if (!args[0]) {
      msg.reply('please enter a category to roll in! For example: \`$roll hololive\`')
      return
    }

    if (!categories.includes(args[0].toLowerCase())) {
      msg.reply('t-that category does not exist')
      return
    }

    let pick = rng()

    User.findOne({ discordid: msg.author.id })
      .then(res => {
        let ownedStars = res.stars
        let ownedCards = res.cards
        let ownedPity = res.pity
        Card.find({ category: args[0].toLowerCase(), rarity: pick })
          .then(cards => {
            shuffle(cards)
            let rolledCard = cards[0]
            ownedCards.push(rolledCard)
            axios.put(`/api/users/update/${msg.author.id}`, {
              cards: ownedCards,
              stars: ownedStars -= 250,
              pity: ownedPity += 1
            })
              .then(() => {
                msg.reply(`you used \`250\` stars. You have \`${ownedStars}\` stars left!`)
                msg.channel.send(`> rolling for <@${msg.author.id}>...`)

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