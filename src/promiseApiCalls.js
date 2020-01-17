const fetch = require('node-fetch')

function promiseApiCalls(urls, settings = { method: "get" }) {
  return Promise.all(urls.map(url => fetch(url, settings)
    .then(rset => rset.json().catch((err) => { err }))
    .catch(err => { err })
  ))
}

module.exports = promiseApiCalls
