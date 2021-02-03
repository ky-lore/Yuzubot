const axios = require('axios')
const Discord = require('discord.js')
const bot = new Discord.Client()

const isRegistered = (discordId) => {
  axios.get(`/api/users/getdisc/${discordId}`)
    .then(({ data }) => {
      return data
    })
    .catch(e => console.error(e))
}

module.exports = {
  name: '$register',
  description: 'register',
  execute(msg, args) {
    if (isRegistered(msg.author.id)) {
      axios.post('/api/users', {
        discordid: msg.author.id,
        username: `${msg.author.username}#${msg.author.discriminator}`,
        stars: 4000,
        cards: []
      })
        .then(res => {
          if (res.status === 200) {
            console.log('User succcessfully created!')
            msg.reply(`you are registered, ${msg.author.username}! You now have 4000 stars to use in your banner of choice!`)
          }
        })
        .catch(err => console.error(err))
    } else {
      msg.reply('you are already registered!')
    }
  }
}