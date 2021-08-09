const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const xorshift = require('xorshift');
const { Card, User } = require('../models');

const categories = ['hololive']

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function rng() {
  let rng = Math.floor(xorshift.random() * 100)
  if (rng <= 5) { //UR rarity
    return 'UR'
  } else if (rng <= 18) { //SSR rarity
    return 'SSR'
  } else if (rng <= 45) { //SR rarity
    return 'SR'
  } else { //R rarity
    return 'R'
  }
}

const colorMap = new Map()

colorMap.set('UR', '#FE4365')
colorMap.set('SSR', '#FBB829')
colorMap.set('SR', '#BD228A')
colorMap.set('R', '#BAE4E5')

module.exports = {
  name: '$roll',
  description: 'newroll',
  async execute(msg, args) {

    if (!args[0]) {
      msg.reply('please enter a category to roll in! For example: \`$roll hololive\`')
      return
    }

    if(!categories.includes(args[0].toLowerCase())) {
      msg.reply('that category does not exist')
      return
    }

    let pick = rng()

    User.findOne({ discordid: msg.author.id })
      .then(res => {
        let ownedStars = res.stars
        let ownedCards = res.cards
        Card.find({ category: args[0].toLowerCase(), rarity: pick })
          .then(cards => {
            shuffle(cards)
            let rolledCard = cards[0]
            ownedCards.push(rolledCard)
            axios.put(`/api/users/update/${msg.author.id}`, {
              cards: ownedCards,
              stars: ownedStars -= 300
            })
            .then(res => {
              msg.reply(`you used \`300\` stars. You have \`${ownedStars}\` stars left!`)
              msg.channel.send(`> rolling for <@${msg.author.id}>...`)

              const cardEmbed = new MessageEmbed()
              .setColor(colorMap.get(`${rolledCard.rarity}`))
              .addField(`${rolledCard.name}`, `${rolledCard.subname} (${rolledCard.rarity})`, true)
              .setImage(`${rolledCard.image}`)
              .setTimestamp()
              .setFooter('Thanks for rolling with Yuzu!', 'https://i.imgur.com/AfFp7pu.png');

              msg.reply({ embeds: [cardEmbed] })
            })
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }
}