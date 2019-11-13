const BN = require('../../../bn')

function ticker (account, fiatCode, cryptoCode) {
  return Promise.resolve({
    rates: {
      ask: BN(1),
      bid: BN(1)
    }
  })
}

module.exports = {ticker}
