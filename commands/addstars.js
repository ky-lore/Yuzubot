const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const bot = new Discord.Client()
const { User } = require('../models')

let ADMIN = [144948446200070140, 149379082721820670, 235575391186583550]

module.exports = {
  name: '$addstars',
  description: '(ADMIN) - Add stars',
  async execute(msg, args) {
    let setUser = args[0]
    axios.get(`/api/users/getbydisc/${setUser.slice(3, setUser.length - 1)}`)
    .then(({ data }) => {
      let prevStars = parseInt(data.stars)
      let addStars = parseInt(args[1])
      if (ADMIN.includes(parseInt(msg.author.id))) {
        User.findOneAndUpdate({ discordid: setUser.slice(3, setUser.length - 1) }, { $set: { stars: prevStars + addStars } })
          .then(res => {
            msg.channel.send(`\`${addStars}\` stars have been added to <@${setUser.slice(3, setUser.length - 1)}>. New balance: \`${prevStars + addStars}\` stars`)
          })
      } else {
        msg.reply('nice try')
      }
    }) 
  }
}