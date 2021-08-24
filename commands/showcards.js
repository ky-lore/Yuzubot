const { User } = require('../models')
const emojiMap = require('../src/getEmoji')

const rarities = ['UR', 'SSR', 'SR', 'R']

module.exports = {
  name: '$showcards',
  description: 'Show cards',
  execute(msg, args) {

    if (args[0] && !rarities.includes(args[0].toUpperCase())) {
      msg.reply('t-that rarity does not exist')
      return
    }

    User.findOne({ discordid: msg.author.id })
      .populate('cards')
      .then(({ cards }) => {
        let displayString = ''
        let nCards = []

        args[0] ? nCards = cards.filter(card => card.rarity === args[0].toUpperCase()).reverse() : nCards = cards 

        let limit = args[1] ? args[1] : 20

        let cutCards = nCards.slice(0, limit)

        cutCards.forEach(card => {
          if (emojiMap.get(card.name)) { displayString += emojiMap.get(card.name) + ' '}
          displayString += `${card.rarity} ${card.name} - "${card.subname}" (${card.category}) ${card.image} (id: ${card.id})\n`
        })

        !args[0] ? msg.reply(`here are your last **20** cards!\`\`\`\n${displayString}\n\`\`\``) : msg.reply(`here ${args[1] == 1 ? 'is' : 'are'} your last${limit ? ' ' + limit : ''} ${args[1] == 1 ? 'card' : 'cards'} of **${args[0].toUpperCase()}** rarity!\`\`\`\n${displayString}\n\`\`\``)
      })
  }
}