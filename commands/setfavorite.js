const { User, Card } = require('../models')
const axios = require('axios')
const { MessageEmbed, channel } = require('discord.js')

function checkOwnedAndHandle(reqId, user, msg) {
    User.findOne({ discordid: user })
        .populate('cards')
        .then(({ cards, favorites }) => {
            var belowLimit = true
            var has = false

            favorites.length > 4 ? belowLimit = false : belowLimit = true

            cards.forEach(card => {
                if (card.id === parseInt(reqId)) {
                    has = true
                }
            })

            has && belowLimit ? setFavorite(reqId, user, msg) : handleError(msg, belowLimit)
        })
}

async function setFavorite(cardId, user, msg) {
    var favCards = []

    await User.findOne({ discordid: user })
        .then(({ favorites }) => {
            favorites.forEach(fav => { favCards.push(fav) })
        })

    await Card.findOne({ id: cardId })
        .then(card => {
            favCards.push(card)
            axios.put(`/api/users/update/${user}`, { favorites: favCards })
            const favEmbed = new MessageEmbed()
                .setColor('#A589E2')
                .addField(`${card.rarity} ${card.name} - *${card.subname}*`, `added to ${msg.author.username}'s favorites!`)
            msg.reply({ embeds: [favEmbed] })
        })
}

function handleError(msg, limit) {
    limit ? notOwned(msg) : msg.reply({ content: 'you have too many cards! p-please remove one to add more...' })
}

function notOwned(msg) {
    msg.reply({ content: `y-you don't own that card s-senpai...` })
    setTimeout(() => {
        msg.channel.send({ content: `but i-i hope you get her soon...! <@${msg.author.id}>`})
    }, 2000)
}

module.exports = {
    name: '$setfav',
    description: 'Show cards',
    execute(msg, args) {
        if (!args[0]) {
            msg.reply('please pick a card ID to set a favorite!\nExample: ```$setfav 2```\nYou can view card IDs with ```$showcards <rarity>```')
            return
        }
        checkOwnedAndHandle(args[0], msg.author.id, msg)
    }
}