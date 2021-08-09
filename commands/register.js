const axios = require('axios')

async function checkRegistered (discordid) {
  const res = axios.get(`/api/users/getbydisc/${discordid}`)
  const dataPromise = res.then((response) => response.data)
  return dataPromise
}

async function isRegistered (discordid) {
  return await checkRegistered(discordid)
}

module.exports = {
  name: '$register',
  description: 'register',
  async execute(msg, args) {
    let isReg = await isRegistered(msg.author.id)
    if (!isReg) {
      axios.post('/api/users', {
        discordid: msg.author.id,
        username: `${msg.author.username}#${msg.author.discriminator}`,
        stars: 4000,
        cards: []
      })
        .then(res => {
          if (res.status === 200) {
            console.log('User succcessfully created!')
            msg.reply(`you are registered, ${msg.author.username}! You now have \`4000\` stars to use in your banner of choice!`)
          }
        })
        .catch(err => console.error(err))
    } else {
      msg.reply('you are already registered!')
    }
  }
}