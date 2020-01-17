const _ = require('lodash')

const latlong = process.env.LATLONG
const darkskykey = process.env.DARKSKYKEY
const weather_url = `https://api.darksky.net/forecast/${darkskykey}/${latlong}`
const weather = {
  urls: [weather_url],
  parser: (rset) => {
    const data = rset[0]
    const summary = _.get(data, 'currently.summary')
    const temp = _.round(_.get(data, 'currently.temperature', 0), 0)
    const feeltemp = _.round(_.get(data, 'currently.apparentTemperature', 0), 0)
    const forecast = _.get(data, 'minutely.summary')
    return {
      api: 'weather',
      payload: [
        `${forecast} and ${temp}.`,
        `Feels like ${feeltemp}.`,
        `${forecast}`
      ]
    }
  }
}

module.exports = weather
