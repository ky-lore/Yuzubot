const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const bot = new Discord.Client()

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = {
  name: '$roll',
  description: 'roll',
  async execute(msg, args) {
    let cardRes = await axios.get(`/api/cards/category/${args[0]}`)
    let userRes = await axios.get(`/api/users/getbydisc/${msg.author.id}`)
    let user = userRes.data
    let rolledCards = cardRes.data
    let ownedCards = userRes.data.cards
    if (rolledCards[0]) {
      shuffle(rolledCards)
      let rolledCard = rolledCards[0]
      ownedCards.push(rolledCard)
      axios.put(`/api/users/update/${msg.author.id}`, {
        cards: ownedCards,
        stars: user.stars-=300
      })
      .then(res => {
        msg.reply(`you used \`300\` stars. You have \`${user.stars}\` stars left!`)
        msg.channel.send(`> rolling for <@${msg.author.id}>...`)
        msg.channel.send(`<@${msg.author.id}> got **${rolledCard.rarity}** ${rolledCard.name} - *${rolledCard.subname}*`, {
          files: [`${rolledCard.image}`]
        })
      })
      .catch(err => console.error(err))
    } else {
      msg.reply('that category does not exist :(')
    }
  }
}