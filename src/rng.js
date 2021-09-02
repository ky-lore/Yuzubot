const xorshift = require('xorshift');


module.exports = function() {
    let rng = Math.floor(xorshift.random() * 100)
    if (rng <= 5) { //UR rarity
        return 'UR'
    } else if (rng <= 18) { //SSR rarity
        return 'SSR'
    } else if (rng <= 45) { //SR rarity
        return 'SR'
    } else { //R rarity
        return 'R'
    }
}