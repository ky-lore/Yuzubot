const axios = require('axios')
const { User } = require('../models')

let ADMIN = [144948446200070140, 149379082721820670, 235575391186583550, 0]

module.exports = {
  name: '$addpity',
  description: '(ADMIN) - Add pity',
  async execute(msg, args) {
    let setUser = args[0]
    axios.get(`/api/users/getbydisc/${setUser.slice(3, setUser.length - 1)}`)
    .then(({ data }) => {
      let prevPity = parseInt(data.pity)
      let addPity = parseInt(args[1])
      if (ADMIN.includes(parseInt(msg.author.id))) {
        User.findOneAndUpdate({ discordid: setUser.slice(3, setUser.length - 1) }, { $set: { pity: prevPity + addPity } })
          .then(() => {
            msg.channel.send(`\`${addPity}\` pity count has been added to <@${setUser.slice(3, setUser.length - 1)}>. New count: \`${prevPity + addPity}\` pity`)
          })
      } else {
        msg.reply('nice try')
      }
    })
    .catch(err => console.log(err))
  }
}