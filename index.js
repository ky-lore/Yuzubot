require('dotenv').config()
const express = require('express')
const { join } = require('path')
const Discord = require('discord.js');
const bot = new Discord.Client()
const TOKEN = process.env.TOKEN
const schedule = require('node-schedule')
const axios = require('axios')

bot.commands = new Discord.Collection()
const botcmd = require('./commands')

Object.keys(botcmd).map(key => {
  bot.commands.set(botcmd[key].name, botcmd[key])
})

const app = express()

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))

bot.login(TOKEN);

require('./db')
  .then(() => app.listen(process.env.PORT || 80))
  .catch(err => console.log(err))

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`)
});

const job = schedule.scheduleJob('1 0 0 * * *', function () {
  axios.put('/api/users/dailyupdate')
    .then(msg.channel.send('Daily stars are now available!'))
    .catch(err => console.error(err))
})

bot.on('message', msg => {
  if (msg.content[0] === "$") {
    const args = msg.content.split(/ +/)
    const command = args.shift().toLowerCase()
    console.info(`${msg.author.username}#${msg.author.discriminator} called command: ${command}`)

    if (!bot.commands.has(command)) return

    try {
      bot.commands.get(command).execute(msg, args)
    } catch (error) {
      console.error(error)
      msg.reply('there was an error trying to execute that command!')
    }
  }
});