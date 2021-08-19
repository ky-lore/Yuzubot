// const { User } = require('../models')
const axios = require('axios')

async function getCards() {
    axios.get('/api/users/getbydisc/144948446200070140')
        .then(res => { dataWrapper(res) })
}

async function dataWrapper(res) {
    return res
}

module.exports = {
    name: '$asynctest',
    description: 'Get your daily coins!',
    async execute(msg, args) {
        getCards()
    }
}