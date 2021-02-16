const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const bot = new Discord.Client()

module.exports = {
  name: '$commands',
  description: 'List commands',
  execute(msg, args) {
    msg.channel.send(`Here are a list of commands you can use:
\`\`\`$daily - claim your daily stars! Resets at midnight, PST/PDT (UTC -8)
$roll <category> - use 300 stars for a single roll!
$register - register yourself in the Yuzubot database with 4000 stars!
$ty - thank Yuzu uwu\`\`\`More are being added, check back later!`)
  }
}