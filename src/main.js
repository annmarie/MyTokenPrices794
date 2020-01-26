const moment = require('moment')
const _ = require('lodash')
const fetch = require('node-fetch')

const fetchApiCalls = (apis) => Promise.all(apis.map(api =>
  Promise.all(api.urls.map(url => fetch(url)
    .then(rset => rset.json()).catch(e => ({ error: e.toString() }))))
  .then(api.parser)))

const main = (apis) => fetchApiCalls(apis)
  .then(d => d.map(r => {
    if (_.isEmpty(_.get(r, 'errors')) === false)
      console.error(r.errors)
    return _.get(r, 'data')
  }))
  .then(d => {
    d.forEach(r => console.table(r))
    console.log(moment(new Date()).format("lll"))
    console.log('---')
  })
  .catch(e => console.error(e))

module.exports = main
