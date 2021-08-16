const { User, Card } = require('../models')
const axios = require('axios')
const { MessageEmbed, channel } = require('discord.js')

function checkOwnedAndHandle(reqId, user, msg) {
    User.findOne({ discordid: user })
        .populate('cards')
        .then(({ cards }) => {
            var check = false
            cards.forEach(card => {
                if (card.id === parseInt(reqId)) {
                    check = true
                }
            })
            check ? isOwned(reqId, user, msg) : isOwned(false)
        })
}

function isOwned(cardId, user, msg) {
    var favCards = []

    User.findOne({ discordid: user })
        .then(({ favorites }) => {
            favorites.forEach(fav => { favCards.push(fav) })
        })


    Card.findOne({ id: cardId })
        .then(card => {
            favCards.push(card)
            axios.put(`/api/users/update/${user}`, { favorites: favCards })
            const favEmbed = new MessageEmbed()
            .setColor('#A589E2')
            .addField(`${card.name} - *${card.subname}*`, `added to ${msg.author.username}'s favorites!`)
            msg.reply({ embeds: [favEmbed] })
        })
}

function tooMany(msg) {
    msg.reply({ content: 'Too many' })
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