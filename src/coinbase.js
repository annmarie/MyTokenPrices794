const formatMoney = require('./formatMoney')
const _ = require('lodash')

const tags = [ 'btc-usd', 'eth-usd', 'ltc-usd', 'xrp-usd' ]
const coinbase = {
  urls: tags.map(tag => `https://api.coinbase.com/v2/prices/${tag}/spot`),
  parser: (d) => {
    const payload = {}
    d.forEach(r => {
      const tag = _.get(r, 'data.base')
      const price = _.get(r, 'data.amount', 0)
      if (tag && price)
        payload[tag.toLowerCase()] = formatMoney(price)
    })
    return { api: 'coinbase', payload };
  }
}

module.exports = coinbase
