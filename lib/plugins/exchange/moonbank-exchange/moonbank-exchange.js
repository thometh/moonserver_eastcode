const coinUtils = require('../../../coin-utils')

module.exports = {
  buy,
  sell
}

function buy (account, cryptoAtoms, fiatCode, cryptoCode) {
  console.log('account: ', account)
  console.log('cryptoAtoms: ', cryptoAtoms)
  console.log('fiatCode: ', fiatCode)
  console.log('cryptoCode: ', cryptoCode)
  const amount = coinUtils.toUnit(cryptoAtoms, cryptoCode)
  console.log('amount: ', amount)
  createMoonbucks(account, amount)

  console.log('[mock:MOONBANK] buying %s %s for %s', cryptoAtoms.toString(), cryptoCode, fiatCode)
  return Promise.resolve()
}

function sell (account, cryptoAtoms, fiatCode, cryptoCode) {
  console.log('account: ', account)
  console.log('[mock:MOONBANK] selling %s %s for %s', cryptoAtoms.toString(), cryptoCode, fiatCode)
  return Promise.resolve()
}

function createMoonbucks(account, amount) {
  console.log(`[mock:MOONBANK] minting Moonbuks: ${amount}, and sending it to: ${account}`)
}