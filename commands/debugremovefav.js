const axios = require('axios')

module.exports = {
    name: '$debugremfav',
    description: 'debug',
    execute(msg, args) {
        axios.put(`/api/users/update/${msg.author.id}`, { favorites: [] })
        msg.reply('f-favorites removed...!')
    }
}