const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const bot = new Discord.Client()

module.exports = {
  name: '$ty',
  description: 'UWU',
  execute(msg, args) {
    msg.reply('np senpai uwu ily')
  }
}