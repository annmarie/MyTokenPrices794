const formatMoney = require('./formatMoney')
const _ = require('lodash')

/// NOTES:
// 1. Binance does not have US currency listings for some coins.
//  Using the BTCUSDT price to do the math and get US dollar price.
// 2. POET Coin is worth less than a penny. round to 3 decimal places.
const tags = [
  'BTCUSDT',
  'ZECBTC',
  'EOSUSDT',
  //'XRPUSDT',
  'RDNBTC',
  'XLMUSDT',
  'ADAUSDT',
  'GNTBTC',
  'POEBTC'
]
const formatUrl = (tag) =>
  `https://api.binance.com/api/v3/ticker/price?symbol=${tag}`
const binance = {
  urls: tags.map(formatUrl),
  parser: (d) => {
    const data = {}
    const errors = []
    const btcObj = _.find(d, ['symbol', 'BTCUSDT'])
    const btcPrice = _.get(btcObj, 'price')
    d.splice(d.indexOf(btcObj), 1)
    d.forEach(r => {
      const tag = _.get(r, 'symbol')
      const price = _.get(r, 'price', 0)
      const errmsg = _.get(r, 'error')
      if (tag && tag.endsWith("USDT")) {
        const key = tag.toLowerCase().replace('usdt', '')
        data[key] = formatMoney(price)
      } else if (tag && tag.endsWith("BTC")) {
        const key = tag.toLowerCase().replace('btc', '')
        const usdPrice = price * btcPrice
        data[key] = (tag === "POEBTC") ?
          _.round(usdPrice, 3).toString() : formatMoney(usdPrice)
      }
      if (errmsg) errors.push(errmsg)
    })
    return { api: 'binance', data, errors };
  }
}

module.exports = binance
