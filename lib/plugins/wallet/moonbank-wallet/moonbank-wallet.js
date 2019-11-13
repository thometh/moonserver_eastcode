var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/e4892c1f623144fa8608556945d83128');

const account1 = '0x00E60e9b6E5D7D3230C7e4CD29eeE2f06CB08fC5';
const account2 = '0x24b54eC6A3B813f92377dCe61dEa486853F7e44C';

const privateKey1 = Buffer.from('fae17360219a95388c54233f8b7e79ea0e5b12ed8fda7a3b84b4b33e7ca42080', 'hex');
const privateKey2 = Buffer.from('e461f46334cc1c278bea547592f55a2679b8037d83b5ad76048f2357a86a5d18', 'hex');

const contractAddress = '0xA0bc0ce6ddD64B5141403379D56aF83C4F076278';
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
    }];

web3.eth.defaultAccount = account1;

const contract = new web3.eth.Contract(abi, contractAddress);

const BN = require('../../../bn')
const E = require('../../../error')
const coinUtils = require('../../../coin-utils')

const NAME = 'FakeMoonbankWallet'

const SECONDS = 1000
const PUBLISH_TIME = 3 * SECONDS
const AUTHORIZE_TIME = PUBLISH_TIME + 5 * SECONDS
const CONFIRM_TIME = AUTHORIZE_TIME + 120 * SECONDS

let t0

function _balance (cryptoCode) {
  const cryptoRec = coinUtils.getCryptoCurrency(cryptoCode)
  const unitScale = cryptoRec.unitScale
  return BN(1000).shift(unitScale).round()
}

function balance (account, cryptoCode) {
  return Promise.resolve()
    .then(() => _balance(cryptoCode))
}

function pendingBalance (account, cryptoCode) {
  return balance(account, cryptoCode)
    .then(b => b.mul(1))
}

function confirmedBalance (account, cryptoCode) {
  return balance(account, cryptoCode)
}

// Note: This makes it easier to test insufficient funds errors
let sendCount = 100

function isInsufficient (cryptoAtoms, cryptoCode) {
  const b = _balance(cryptoCode)
  return cryptoAtoms.gt(b.div(1000).mul(sendCount))
}

function sendCoins (account, toAddress, cryptoAtoms, cryptoCode) {
  console.log('firing sendCoins from moonbank-wallet.js');
  console.log('account', account)
  sendCount++
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isInsufficient(cryptoAtoms, cryptoCode)) {
        console.log('[%s] DEBUG: Mock Moonbank wallet insufficient funds: %s',
          cryptoCode, cryptoAtoms.toString())
        return reject(new E.InsufficientFundsError())
      }

      //////////////////////////////////////////////////////
      // const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/e4892c1f623144fa8608556945d83128'))

      const amount = web3.utils.toHex(coinUtils.toUnit(cryptoAtoms, cryptoCode))

      const createMoonbucks = contract.methods.createMoonbucks(toAddress, amount).encodeABI();

      web3.eth.getTransactionCount(account1, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            data: createMoonbucks,
        }
    
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey1);
    
        const serializedTransaction = tx.serialize();
        const raw = '0x' + serializedTransaction.toString('hex')
    
        const transaction = web3.eth.sendSignedTransaction(raw, (err, res) => {
            console.log(res)
        })
      })

      // TODO add the Smart Contract interation code here...
      //////////////////////////////////////////////////////

      console.log('[%s] DEBUG: Mock Moonbank wallet sending %s cryptoAtoms to %s',
        cryptoCode, cryptoAtoms.toString(), toAddress)
      return resolve({ txid: '<txHash>', fee: BN(0) })
    }, 2000)
  })
}

function newAddress () {
  t0 = Date.now()
  return Promise.resolve('<Fake Moonbank address, don\'t send>')
}

function newFunding (account, cryptoCode) {
  const promises = [
    pendingBalance(account, cryptoCode),
    confirmedBalance(account, cryptoCode),
    newAddress(account, {cryptoCode})
  ]

  return Promise.all(promises)
    .then(([fundingPendingBalance, fundingConfirmedBalance, fundingAddress]) => ({
      fundingPendingBalance,
      fundingConfirmedBalance,
      fundingAddress
    }))
}

function getStatus (account, toAddress, cryptoAtoms, cryptoCode) {
  const elapsed = Date.now() - t0

  if (elapsed < PUBLISH_TIME) return Promise.resolve({status: 'notSeen'})
  if (elapsed < AUTHORIZE_TIME) return Promise.resolve({status: 'published'})
  if (elapsed < CONFIRM_TIME) return Promise.resolve({status: 'authorized'})

  console.log('[%s] DEBUG: Mock Moonbank wallet has confirmed transaction [%s]', cryptoCode, toAddress.slice(0, 5))

  return Promise.resolve({status: 'confirmed'})
}

module.exports = {
  NAME,
  balance,
  sendCoins,
  newAddress,
  getStatus,
  newFunding
}
