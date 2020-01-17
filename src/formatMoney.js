const _ = require('lodash')

module.exports = (money) => {
  let smp = _.split(_.round(money, 2), '.')
  if (smp.length === 1)
    smp[1] = '00'
  else if (smp[1].length === 1)
    smp[1] = `${smp[1]}0`
  return _.join(smp, '.')
}
