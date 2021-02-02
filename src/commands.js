const axios = require('axios')
const Discord = require('discord.js')
const bot = new Discord.Client()

const Commands = {
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
      }
    })
    .catch(err => console.error(err))
  },

  
}

module.exports = Commands