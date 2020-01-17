const formatMoney = require('./formatMoney')
const _ = require('lodash')

// NOTES:
// 1. Binance does not have US currency listings for some coins. We are
//    using the BTCUSDT price to do the math to figure out US dollar price.
// 2. POET Coin is worth less than a penny. so we round to 3 decimal places.

const tags = [ 'ZECBTC', 'EOSUSDT', 'XRPUSDT', 'RDNBTC', 'XLMUSDT',
  'ADAUSDT', 'BTCUSDT', 'GNTBTC', 'POEBTC' ]
const binance = {
  urls: tags.map(tag => `https://api.binance.com/api/v3/ticker/price?symbol=${tag}`),
  parser: (d) => {
    const payload = {}
    const btcObj = _.find(d, ['symbol', 'BTCUSDT'])
    const btcPrice = _.get(btcObj, 'price')
    d.splice(d.indexOf(btcObj), 1)
    d.forEach(r => {
      const tag = _.get(r, 'symbol')
      const price = _.get(r, 'price', 0)
      if (tag && tag.endsWith("USDT")) {
        payload[tag.toLowerCase().replace('usdt', '')] = formatMoney(price)
      } else if (tag && tag.endsWith("BTC")) {
        const decNum = (tag === "POEBTC") ? 3 : 2
        const btcprice = _.round(price * btcPrice, decNum)
        payload[tag.toLowerCase().replace('btc', '')] = btcprice.toString()
      }
    })
    return { api: 'binance', payload };
  }
}


module.exports = binance 
