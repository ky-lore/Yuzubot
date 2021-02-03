require('dotenv').config();
const express = require('express')
const { join } = require('path')
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const app = express()

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))

bot.login(TOKEN);

require('./db')
  .then(() => app.listen(process.env.PORT || 80))
  .catch(err => console.log(err))

const yuzu = require('./commands/commands')

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  switch (msg.content) {
    case '$register':
      yuzu.register(msg)
      break
  }
})