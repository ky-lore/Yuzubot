const { MessageEmbed } = require('discord.js')

module.exports = {
  name: '$help',
  description: 'List commands',
  execute(msg, args) {

    const cmdEmbed = new MessageEmbed()
      .setColor('#EFE685')
      .addFields({
        name: 'CURRENT CATEGORIES',
        value: 'hololive, genshin'
      }, {
        name: '$daily',
        value: 'claim your daily stars! Resets at midnight, PST/PDT (UTC -8)'
      }, {
        name: '$roll <category>',
        value: 'use 250 stars for a single roll! see the top of this message for the current categories!'
      }, {
        name: '$register',
        value: 'register yourself in the Yuzubot database with 4000 stars!'
      }, {
        name: '$showcards <rarity> <quantity>',
        value: 'show your latest cards of any rarity!'
      }, {
        name: '$ty',
        value: 'thank Yuzu uwu'
      }, {
        name: '$setfav <id>',
        value: 'set one of your cards as a favorite!'
      }, {
        name: '$removefav <id>',
        value: 'removes one of your favorites :('
      }, {
        name: '$fav',
        value: 'show off your favorites!'
      })
      .setFooter('Yuzu is open-source! https://github.com/ky-lore/Yuzubot', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png')

    //     msg.channel.send(`Here are a list of commands you can use:
    // \`\`\`$daily - claim your daily stars! Resets at midnight, PST/PDT (UTC -8)
    // $roll <category> - use 300 stars for a single roll!
    // $register - register yourself in the Yuzubot database with 4000 stars!
    // $showcards <rarity> - show your latest 20 cards of any rarity!
    // $ty - thank Yuzu uwu\`\`\`More are being added, check back later!`)

    msg.channel.send({ embeds: [cmdEmbed] })
  }
}