const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const bot = new Discord.Client()

module.exports = {
  name: '$daily',
  description: 'Get your daily coins!',
  execute(msg, args) {
    axios.get(`/api/users/getbydisc/${msg.author.id}`)
    .then(({ data }) => {
      let stars = data.stars
      if(!data.hasDaily) {

        axios.put(`/api/users/update/${msg.author.id}`, {
          stars: stars+250,
          hasDaily: true
        })
        .then(res => {
          msg.reply(`you have claimed your daily \`250\` stars! You are now at \`${stars + 250}\` stars!`)
        })
        .catch(err => console.error(err))

      } else {
        msg.reply(`you've already claimed your daily stars! You currently have \`${stars}\` stars`)
      }
    })
    .catch(e => console.error(e))
  }
}