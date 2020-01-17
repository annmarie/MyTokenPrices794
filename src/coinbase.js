const formatMoney = require('./formatMoney')
const _ = require('lodash')

const tags = [ 'btc-usd', 'eth-usd', 'ltc-usd', 'xrp-usd' ]
const formatUrl = (tag) => `https://api.coinbase.com/v2/prices/${tag}/spot`
const coinbase = {
  urls: tags.map(formatUrl),
  parser: (d) => {
    const data = {}
    const errors = []
    d.forEach(r => {
      const tag = _.get(r, 'data.base', '').toLowerCase()
      const price = _.get(r, 'data.amount', 0)
      const errmsg = _.get(r, 'error')
      if (tag) data[tag] = formatMoney(price)
      if (errmsg) errors.push(errmsg)
    })
    return { api: 'coinbase', data, errors };
  }
}

module.exports = coinbase
