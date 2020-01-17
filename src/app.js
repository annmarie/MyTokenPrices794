const _ = require('lodash')
const moment = require('moment')
require('dotenv').config()
const promiseApiCalls = require('./promiseApiCalls')
const weather = require('./weather')
const coinbase = require('./coinbase')
const binance = require('./binance')

const ApiCalls = [
  promiseApiCalls(weather.urls).then(weather.parser),
  promiseApiCalls(coinbase.urls).then(coinbase.parser),
  promiseApiCalls(binance.urls).then(binance.parser),
]

module.exports = () => {
  return Promise.all(ApiCalls)
    .then(d => {
      d.forEach(r => console.table(r.payload))
    })
    .then(() => {
      console.log('')
      console.log(moment(new Date()).format("lll"))
    })
    .catch((err) => console.log(err))
    .then(() => console.log('---'))
}
