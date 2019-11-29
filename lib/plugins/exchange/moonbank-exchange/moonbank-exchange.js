// var Tx = require('ethereumjs-tx');
// const pify = require('pify');
// const Web3 = require('web3');
// const infuraUrl = 'https://ropsten.infura.io/v3/e4892c1f623144fa8608556945d83128';
// const web3 = new Web3(infuraUrl);

// web3.setProvider(new web3.providers.HttpProvider(infuraUrl));

// const account1 = '0x00E60e9b6E5D7D3230C7e4CD29eeE2f06CB08fC5';
// const account2 = '0x24b54eC6A3B813f92377dCe61dEa486853F7e44C';

// const privateKey1 = Buffer.from('fae17360219a95388c54233f8b7e79ea0e5b12ed8fda7a3b84b4b33e7ca42080', 'hex');

// const contractAddress = '0xA0bc0ce6ddD64B5141403379D56aF83C4F076278';
// const abi = [
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "addMinter",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "approve",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "createMoonbucks",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "subtractedValue",
//                 "type": "uint256"
//             }
//         ],
//         "name": "decreaseAllowance",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "destroyMoonbucks",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "addedValue",
//                 "type": "uint256"
//             }
//         ],
//         "name": "increaseAllowance",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "mint",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "MinterAdded",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "MinterRemoved",
//         "type": "event"
//     },
//     {
//         "constant": false,
//         "inputs": [],
//         "name": "renounceMinter",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "recipient",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Transfer",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Approval",
//         "type": "event"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "sender",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "recipient",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transferFrom",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "_name",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "_symbol",
//                 "type": "string"
//             },
//             {
//                 "internalType": "uint8",
//                 "name": "_decimal",
//                 "type": "uint8"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_initialSupply",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             }
//         ],
//         "name": "allowance",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "decimals",
//         "outputs": [
//             {
//                 "internalType": "uint8",
//                 "name": "",
//                 "type": "uint8"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "isMinter",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     }];

// web3.eth.defaultAccount = account1;

// var MyContract = web3.eth.contract(abi);

// var myContractInstance = MyContract.at(contractAddress);

module.exports = {
  buy,
  sell
}

function buy (account, cryptoAtoms, fiatCode, cryptoCode) {
//   var name = myContractInstance.name();
//   console.log('Contract Name: ', name);
  console.log(`[mock] buying %s %s for %s`, cryptoAtoms.toString(), cryptoCode, fiatCode)
  return Promise.resolve()
}

function sell (account, cryptoAtoms, fiatCode, cryptoCode) {
//   var name = myContractInstance.name();
//   console.log('Contract Name: ', name);
  console.log(`[mock] selling %s %s for %s`, cryptoAtoms.toString(), cryptoCode, fiatCode)
  return Promise.resolve()
}

// function createMoonbucks(_toAddress, amount) {
//   const fromAddress = account1;
//   const toAddress = _toAddress;

//   const txTemplate = {
//       from: fromAddress,
//       to: toAddress,
//       value: amount
//   }

//   const promises = [
//       pify(web3.eth.estimateGas)(txTemplate),
//       pify(web3.eth.getGasPrice)(),
//       pify(web3.eth.getTransactionCount)(fromAddress)
//   ]

//   return Promise.all(promises)
//     .then(arr => {
//       const gas = arr[0]
//       const gasPrice = arr[1]
//       const txCount = arr[2]

//       var create = myContractInstance.createMoonbucks.getData(toAddress, amount);

//       const rawTx = {
//           nonce: txCount,
//           gasPrice: web3.toHex(gasPrice),
//           gasLimit: web3.toHex(gas * 2),
//           to: contractAddress,
//           from: fromAddress,
//           value: web3.toHex(web3.toWei('0', 'ether')),
//           data: create,
//       }

//       const tx = new Tx(rawTx)
//       tx.sign(privateKey1)

//       const serializedTransaction = tx.serialize();
//       const raw = '0x' + serializedTransaction.toString('hex');

//       const transaction = web3.eth.sendRawTransaction(raw, (err, res) => {
//           if (!err) {
//               console.log(res)
//           } else {
//               console.log(err)
//           }
//       })
//     })
// }