const Discord = require('discord.js');
const bot = new Discord.Client();

const Commands = {
  register: (msg) => {
    console.log(msg.author)
  }
}

module.exports = Commands