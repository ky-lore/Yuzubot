const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const { User } = require('../models')
const getEmoji = require('../src/getEmoji')

const rarities = ['UR', 'SSR', 'SR', 'R']

module.exports = {
  name: '$showcards',
  description: 'Show cards',
  execute(msg, args) {

    if (!args[0]) {
      msg.reply('please enter a rarity to filter your cards by! For example: \`$showcards UR\`')
      return
    }

    if (!rarities.includes(args[0].toUpperCase())) {
      msg.reply('that rarity does not exist')
      return
    }

    User.findOne({ discordid: msg.author.id })
      .populate('cards')
      .then(({ cards }) => {
        let displayString = ''
        let nCards = cards.filter(card => card.rarity === args[0].toUpperCase()).reverse()
        let cutCards = nCards.slice(0, 20)
        cutCards.forEach(card => {
          if (getEmoji(card.name)) {
            displayString += getEmoji(card.name) + ' '
          }
          displayString += `${card.name} - "${card.subname}" (${card.category}) ${card.image}\n`
        })
        msg.reply(`here are your last **20** cards of **${args[0].toUpperCase()}** rarity!\`\`\`\n${displayString}\n\`\`\``)
      })
  }
}