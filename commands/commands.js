const axios = require('axios')
const Discord = require('discord.js')
const bot = new Discord.Client()

module.exports = {
  register: (msg) => {
    axios.post('/api/users', {
      discordid: msg.author.id,
      username: `${msg.author.username}#${msg.author.discriminator}`,
      stars: 4000,
      cards: []
    })
    .then(res => {
      if(res.status === 200) {
        console.log('User succcessfully created!')
        msg.reply(`you are registered, ${msg.author.username}#${msg.author.discriminator}! You now have 4000 stars to use in your banner of choice!`)
      }
    })
    .catch(err => console.error(err))
  },
}