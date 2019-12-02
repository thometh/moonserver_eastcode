'use strict'

const Web3 = require('web3')
const web3 = new Web3()
const hdkey = require('ethereumjs-wallet/hdkey')
const Tx = require('ethereumjs-tx')
const util = require('ethereumjs-util')
const pify = require('pify')
const BN = require('../../../bn')
const coinUtils = require('../../../coin-utils')

const NAME = 'geth'
exports.SUPPORTED_MODULES = ['wallet']

const paymentPrefixPath = "m/44'/60'/0'/0'"
const defaultPrefixPath = "m/44'/60'/1'/0'"
let lastUsedNonces = {}

module.exports = {
  NAME,
  balance,
  sendCoins,
  newAddress,
  getStatus,
  sweep,
  defaultAddress,
  supportsHd: true,
  newFunding,
  privateKey,
  isStrictAddress,
  connect
}

const contractAddress = '0xA0bc0ce6ddD64B5141403379D56aF83C4F076278';
const account1 = '0x00E60e9b6E5D7D3230C7e4CD29eeE2f06CB08fC5';
const privateKey1 = Buffer.from('fae17360219a95388c54233f8b7e79ea0e5b12ed8fda7a3b84b4b33e7ca42080', 'hex');
const abi = [
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "addMinter",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "createMoonbucks",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
          }
      ],
      "name": "decreaseAllowance",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "destroyMoonbucks",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "addedValue",
              "type": "uint256"
          }
      ],
      "name": "increaseAllowance",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "mint",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "MinterAdded",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "MinterRemoved",
      "type": "event"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "renounceMinter",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "sender",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_name",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "_symbol",
              "type": "string"
          },
          {
              "internalType": "uint8",
              "name": "_decimal",
              "type": "uint8"
          },
          {
              "internalType": "uint256",
              "name": "_initialSupply",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "isMinter",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  }]

var MyContract = web3.eth.contract(abi);

var myContractInstance = MyContract.at(contractAddress);

function connect (url) {
  if (!web3.isConnected()) {
    web3.setProvider(new web3.providers.HttpProvider(url))
  }
}

const hex = bigNum => '0x' + bigNum.truncated().toString(16)

function privateKey (account) {
//   return defaultWallet(account).getPrivateKey()
    return privateKey1
}

function isStrictAddress (cryptoCode, toAddress) {
  return cryptoCode === 'MOON' && util.isValidChecksumAddress(toAddress)
}

function sendCoins (account, toAddress, cryptoAtoms, cryptoCode) {
  console.log('&&&&&&^^^^^%%%%$$$$########')
  console.log('firing sendCoins cryptoAtoms: ', cryptoAtoms.toNumber())
    return createMoonbucks(toAddress, cryptoAtoms.toNumber())
    .then(pify(web3.eth.sendRawTransaction))
    .then(txid => {
        return pify(web3.eth.getTransaction)(txid)
            .then(tx => {
                if (!tx) return { txid }

                const fee = BN(tx.gas).mul(BN(tx.gasPrice)).round()

                return { txid, fee }
            })
    })
//   return generateTx(toAddress, defaultWallet(account), cryptoAtoms, false)
//     .then(pify(web3.eth.sendRawTransaction))
//     .then(txid => {
//       return pify(web3.eth.getTransaction)(txid)
//         .then(tx => {
//           if (!tx) return { txid }

//           const fee = BN(tx.gas).mul(BN(tx.gasPrice)).round()

//           return { txid, fee }
//         })
//     })
}

function checkCryptoCode (cryptoCode) {
    if (cryptoCode === 'ETH') return Promise.resolve()
    else if (cryptoCode === 'MOON') return Promise.resolve()
  return Promise.reject(new Error('cryptoCode must be ETH or MOON'))
}

function balance (account, cryptoCode) {
  return checkCryptoCode(cryptoCode)
    .then(() => pendingBalance(defaultAddress(account)))
}

const pendingBalance = address => _balance(true, address)
const confirmedBalance = address => _balance(false, address)

// function _balance (includePending, address) {
//   const block = includePending ? 'pending' : undefined

//   const cryptoRec = coinUtils.getCryptoCurrency('MOON')
//   const unitScale = cryptoRec.unitScale

//   var balance = myContractInstance.balanceOf(account1)
//   console.log('Account 1 balance: ', balance.toNumber())
//   var newBalance = balance.toNumber() / 1000000000000000000;

//   return BN(newBalance).shift(unitScale).round()
// }
// function _balance (includePending, address) {
//     const block = includePending ? 'pending' : undefined

//     const cryptoRec = coinUtils.getCryptoCurrency('MOON')
//     const unitScale = cryptoRec.unitScale
//     return pify(myContractInstance.balanceOf(address))
// }

function _balance (includePending, address) {
    const block = includePending ? 'pending' : undefined
  
    return pify(myContractInstance.balanceOf)(address.toLowerCase(), block)
}

function generateTx (_toAddress, wallet, amount, includesFee) {
  console.log('############## genereateTx')
  console.log('toAddress', _toAddress)
  console.log('amount', amount.toNumber())
  const fromAddress = '0x' + wallet.getAddress().toString('hex')
  console.log(fromAddress)
  const toAddress = _toAddress.toLowerCase()

  const txTemplate = {
    from: fromAddress,
    to: toAddress,
    value: amount
  }

  const promises = [
    pify(web3.eth.estimateGas)(txTemplate),
    pify(web3.eth.getGasPrice)(),
    pify(web3.eth.getTransactionCount)(fromAddress)
  ]

  return Promise.all(promises)
    .then(arr => {
      const gas = arr[0]
      const gasPrice = arr[1]
      const txCount = arr[2] <= lastUsedNonces[fromAddress]
        ? lastUsedNonces[fromAddress] + 1
        : arr[2]

      lastUsedNonces[fromAddress] = txCount

      const toSend = includesFee
        ? amount.minus(gasPrice.times(gas))
        : amount

      const rawTx = {
        nonce: txCount,
        gasPrice: hex(gasPrice),
        gasLimit: gas,
        to: toAddress,
        from: fromAddress,
        value: hex(toSend)
      }

      const tx = new Tx(rawTx)
      const privateKey = wallet.getPrivateKey()

      tx.sign(privateKey)

      return '0x' + tx.serialize().toString('hex')
    })
}

function createMoonbucks(_mintToAddress, amount) {
  console.log('########## firing createMoonbucks in base.js ###########')
  const fromAddress = account1;
  const toAddress = _mintToAddress.toString('hex');

  const txTemplate = {
    from: fromAddress,
    to: toAddress,
    value: amount
  }

  // web3.eth.defaultAccount = account1;

  const promises = [
    pify(web3.eth.estimateGas)(txTemplate),
    pify(web3.eth.getGasPrice)(),
    pify(web3.eth.getTransactionCount)(fromAddress)
  ]

  console.log('########## // firing createMoonbucks in base.js // ###########')

  return Promise.all(promises)
    .then(arr => {
        const gas = arr[0]
        const gasPrice = arr[1]
        const txCount = arr[2] <= lastUsedNonces[fromAddress]
        ? lastUsedNonces[fromAddress] + 1
        : arr[2]

        lastUsedNonces[fromAddress] = txCount

        var create = myContractInstance.createMoonbucks.getData(toAddress, amount);

        const rawTx = {
            nonce: txCount,
            gasPrice: web3.toHex(gasPrice),
            gasLimit: (gas * 4),
            to: contractAddress,
            from: fromAddress,
            value: web3.toHex(web3.toWei('0', 'ether')),
            data: create
        }

        const tx = new Tx(rawTx)
        tx.sign(privateKey1)

        const serializedTransaction = tx.serialize();
        const raw = '0x' + serializedTransaction.toString('hex');

        return raw
    });
}

function destroyMoonbucks(_mintToAddress, amount) {
    console.log('########## firing destroyMoonbucks in base.js ###########')
    const fromAddress = account1;
    const toAddress = _mintToAddress.toString('hex');
  
    const txTemplate = {
      from: fromAddress,
      to: toAddress,
      value: amount
    }
  
    // web3.eth.defaultAccount = account1;
  
    const promises = [
      pify(web3.eth.estimateGas)(txTemplate),
      pify(web3.eth.getGasPrice)(),
      pify(web3.eth.getTransactionCount)(fromAddress)
    ]
  
    console.log('########## // firing destroyMoonbucks in base.js // ###########')
  
    return Promise.all(promises)
      .then(arr => {
          const gas = arr[0]
          const gasPrice = arr[1]
          const txCount = arr[2] <= lastUsedNonces[fromAddress]
          ? lastUsedNonces[fromAddress] + 1
          : arr[2]
  
          lastUsedNonces[fromAddress] = txCount
  
          var create = myContractInstance.destroyMoonbucks.getData(toAddress, amount);
  
          const rawTx = {
              nonce: txCount,
              gasPrice: web3.toHex(gasPrice),
              gasLimit: (gas * 4),
              to: contractAddress,
              from: fromAddress,
              value: web3.toHex(web3.toWei('0', 'ether')),
              data: create
          }
  
          const tx = new Tx(rawTx)
          tx.sign(privateKey1)
  
          const serializedTransaction = tx.serialize();
          const raw = '0x' + serializedTransaction.toString('hex');
  
          return raw
      });
  }

// function defaultWallet (account) {
//   return defaultHdNode(account).deriveChild(0).getWallet()
// }

function defaultAddress (account) {
  console.log('//// defaultWallet ////', account1)
  // return defaultWallet(account).getChecksumAddressString()
  web3.eth.defaultAccount = account1;
  return account1;
}

function sweep (account, cryptoCode, hdIndex) {
  const wallet = paymentHdNode(account).deriveChild(hdIndex).getWallet()
  const fromAddress = wallet.getChecksumAddressString()

  return confirmedBalance(fromAddress)
    .then(r => {
        if (r.eq(0)) return

        console.log('------ response: -----', r)

        // burnAmount = (r.toNumber()) / 100;
        // console.log(burnAmount)

        return destroyMoonbucks(fromAddress, r.toNumber())
            .then(signedTx => pify(web3.eth.sendRawTransaction)(signedTx))
    })
    // works with out checking balance
    // return destroyMoonbucks(fromAddress, 100)
    //     .then(signedTx => pify(web3.eth.sendRawTransaction)(signedTx))

//   return confirmedBalance(fromAddress)
//     .then(r => {
//       if (r.eq(0)) return

//       console.log('00000000000000000000000')
//       console.log(fromAddress)
      
//       return destroyMoonbucks(fromAddress, 100)

//     //   return generateTx(defaultAddress(account), wallet, r, true)
//     //     .then(signedTx => pify(web3.eth.sendRawTransaction)(signedTx))
//     // })
}

function newAddress (account, info) {
  const childNode = paymentHdNode(account).deriveChild(info.hdIndex)
  return Promise.resolve(childNode.getWallet().getChecksumAddressString())
}

function getStatus (account, toAddress, cryptoAtoms, cryptoCode) {
  return checkCryptoCode(cryptoCode)
    .then(() => confirmedBalance(toAddress))
    .then(confirmed => {
      if (confirmed.gte(cryptoAtoms)) return {status: 'confirmed'}

      return pendingBalance(toAddress)
        .then(pending => {
          if (pending.gte(cryptoAtoms)) return {status: 'published'}
          if (pending.gt(0)) return {status: 'insufficientFunds'}
          return {status: 'notSeen'}
        })
    })
}

function paymentHdNode (account) {
  const masterSeed = account.seed
  if (!masterSeed) throw new Error('No master seed!')
  const key = hdkey.fromMasterSeed(masterSeed)
  return key.derivePath(paymentPrefixPath)
}

function defaultHdNode (account) {
  const masterSeed = account.seed
  if (!masterSeed) throw new Error('No master seed!')
  const key = hdkey.fromMasterSeed(masterSeed)
  return key.derivePath(defaultPrefixPath)
}

function newFunding (account, cryptoCode) {
  console.log('&&&&&&&&&&&&7 new funding from base.js &&&&&&&&7')
  return checkCryptoCode(cryptoCode)
    .then(() => {
      const fundingAddress = defaultAddress(account)

      const promises = [
        pendingBalance(fundingAddress),
        confirmedBalance(fundingAddress)
      ]

      return Promise.all(promises)
        .then(([fundingPendingBalance, fundingConfirmedBalance]) => ({
          fundingPendingBalance,
          fundingConfirmedBalance,
          fundingAddress
        }))
    })
}
