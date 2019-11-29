const base = require('./base')

const coinUtils = require('../../../coin-utils')
const cryptoRec = coinUtils.getCryptoCurrency('MOON')
const defaultPort = cryptoRec.defaultPort

base.connect(`http://localhost:${defaultPort}`)

module.exports = base
