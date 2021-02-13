const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const bot = new Discord.Client()
const { User } = require('../models')

module.exports = {
  name: '$showcards',
  description: 'Show cards',
  execute(msg, args) {
    User.findOne({ discordid: msg.author.id })
      .populate('cards')
      .then(data => {
        console.log(data.cards)
      })
  }
}