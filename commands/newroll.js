const axios = require('axios')
const Discord = require('discord.js')
const { description } = require('./register')
const bot = new Discord.Client()
const xorshift = require('xorshift');
const { Card } = require('../models')

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function rng() {
  let rng = Math.floor(xorshift.random() * 100)
  if (rng <= 5) { //UR rarity
    let pick = 'UR'
    return pick
  } else if (rng <= 13) { //SSR rarity
    let pick = 'SSR'
    return pick
  } else if (rng <= 25) { //SR rarity
    let pick = 'SR'
    return pick
  } else { //R rarity
    let pick = 'R'
    return pick
  }
}

module.exports = {
  name: '$nr',
  description: 'newroll',
  execute(msg, args) {
    let pick = rng()
    
  }
}