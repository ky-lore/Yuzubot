const { MessageEmbed } = require('discord.js')

module.exports = {
  name: '$embedtest',
  description: 'UWU',
  execute(msg, args) {
    const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.addField('Inline field title', 'https://i.imgur.com/AfFp7pu.png', true)
	.setImage('https://i.imgur.com/6Ab9XUS.png')
	.setTimestamp()
	.setFooter('Thanks for rolling with Yuzu!', 'https://i.imgur.com/AfFp7pu.png');

    msg.reply({ embeds: [exampleEmbed] })
  }
}