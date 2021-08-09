const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: '$commands',
  description: 'List commands',
  execute(msg, args) {

    const cmdEmbed = new MessageEmbed()
    .setColor('#EFE685')
    .addFields({
      name: '$daily',
      value: 'claim your daily stars! Resets at midnight, PST/PDT (UTC -8)'
    }, {
      name: '$roll <category>',
      value: 'use 300 stars for a single roll!'
    }, {
      name: '$register',
      value: 'register yourself in the Yuzubot database with 4000 stars!'
    }, {
      name: '$showcards <rarity>',
      value: 'show your latest 20 cards of any rarity!'
    }, {
      name: '$ty',
      value: 'thank Yuzu uwu'
    })
    .setFooter('View the source code here! https://github.com/ky-lore/Yuzubot', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png')
    
//     msg.channel.send(`Here are a list of commands you can use:
// \`\`\`$daily - claim your daily stars! Resets at midnight, PST/PDT (UTC -8)
// $roll <category> - use 300 stars for a single roll!
// $register - register yourself in the Yuzubot database with 4000 stars!
// $showcards <rarity> - show your latest 20 cards of any rarity!
// $ty - thank Yuzu uwu\`\`\`More are being added, check back later!`)

    msg.channel.send({ embeds: [cmdEmbed] })
  }
}