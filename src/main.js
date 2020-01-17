const moment = require('moment')
const _ = require('lodash')
const fetch = require('node-fetch')

const fetchApiCalls = (apis) => Promise.all(apis.map(api =>
  Promise.all(api.urls.map(url => fetch(url)
    .then(rset => rset.json()).catch(e => ({ error: e.toString() }))))
  .then(api.parser)))

const main = (apis) => fetchApiCalls(apis)
  .then(d => d.map(r => _.isEmpty(r.errors) ? r.data : [r.data, r.errors]))
  .then(d => {
    d.forEach(r => console.log(r))
    console.log(moment(new Date()).format("lll"))
    console.log('---')
  })
  .catch(e => console.error(e))

module.exports = main
