const $ = require('jquery');
const coinUtils = require('../../../coin-utils')

module.exports = {
  buy,
  sell
}

const App = () => ({
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // App.account = web3.eth.accounts[0];
    App.account = '0x18857b550B308aa6Bfd7B0Cd820f31767f4c5a58';
    console.log(App.account)
  },

  loadContract: async () => {
    const moonBank = await $.getJSON('MoonBank.json')
    App.contracts.MoonBank = TruffleContract(moonBank)
    App.contracts.MoonBank.setProvider(App.web3Provider)
    App.moonBank = await App.contracts.MoonBank.deployed()
  },

  createMoonbucks: async (account, cryptoAtoms) => {
    await App.moonBank.createMoonbucks(account, cryptoAtoms)
  },

  balanceOf: async (account) => {
    // const results = await App.moonBank.balanceOf(account)
    // console.log('balanceOf: ', results.toNumber())
    console.log('ACCOUNT RIGHT HERE', account)
  },
})

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
  console.log('[mock:MOONBANK] selling %s %s for %s', cryptoAtoms.toString(), cryptoCode, fiatCode)
  return Promise.resolve()
}

function createMoonbucks(account, amount) {
  console.log(`[mock:MOONBANK] minting Moonbuks: ${amount}, and sending it to: ${account}`)
}