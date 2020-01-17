const main = require('./main')
const coinbase = require('./coinbase')
const binance = require('./binance')

const app = main.bind({}, [coinbase, binance])

app();
setInterval(app, 20000);
