const { utils } = require('ethers');
const { ethers } = require('hardhat');
//let Web3 = require('web3');
//const web3 = new Web3(process.env.POLYGON_MUMBAI_ALCHEMY);





// -------------------CALLDATA------------------- //
// Get the function signature by hashing it and retrieving the first 4 bytes
// The first four bytes of the calldata for a function call specifies the function to be called
// It is the first (left, high-order in big-endian) four bytes of the Keccak-256 hash of the 
// signature of the function. Now since 1 nibble (4 bits) can be represented by a hex digit,
// 1 byte == 2 hex digits => 4 bytes == 8 hex digits
//let fnSignatureSellOrder = web3.utils.keccak256("SellOrder(address seller,address contractAddress,uint256 tokenId,uint256 startTime,uint256 expiration,uint256 price,uint256 quantity,uint256 createdAtBlockNumber,address paymentERC20)")

//hashStruct(s : 𝕊) = keccak256(typeHash ‖ encodeData(s)) where typeHash = keccak256(encodeType(typeOf(s)))

let typeHash = ethers.utils.keccak256(utils.toUtf8Bytes("SellOrder(address seller,address contractAddress,uint256 tokenId,uint256 startTime,uint256 expiration,uint256 price,uint256 quantity,uint256 createdAtBlockNumber,address paymentERC20)"))
console.log(`typeHash: ${typeHash} \n HashLenght ${typeHash.length}`)
// Encode the function parameters
let dataType = [
  'uint256', /*Typehash */
  'address',/* Seller of the NFT */
  'address',/* Contract address of NFT */ 
  'uint256',/* Token id of NFT to sell */
  'uint256', /* Start time in unix timestamp */
  'uint256', /* Expiration in unix timestamp */
  'uint256', /* Price in wei */
  'uint256',/* Number of tokens to transfer; should be 1 for ERC721 */
  'uint256', /* Block number that this order was created at */
  'address', /* Address of the ERC20 token for the payment. Will be the zero-address for payments in native ETH. */
  
]

//console.log("Data Types:",dataType.length)

let seller = process.env.ADDRESS0
let contractAddress = process.env.NP
let tokenId = 12
let startTime = Math.floor(Date.now() / 1000) - 60 * 10
let expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 10
let price = utils.parseEther('0.001')
//let price = 1*10**16
let quantity = 1
let createdAtBlockNumber = 30398292
let paymentERC20 = process.env.VR

let value = [typeHash, seller, contractAddress,tokenId,startTime, expiration,price, quantity,createdAtBlockNumber, paymentERC20]

//console.log("Values:",value.length)

//let fnParamsSellOrder = web3.eth.abi.encodeParameters(dataType,value);
let abiCoder = new ethers.utils.AbiCoder()
let encodeData = abiCoder.encode(dataType,value)

let hashStruct = ethers.utils.keccak256(encodeData)


console.log(`hashStruct: ${hashStruct } \n HashLenght ${hashStruct.length}`)


 module.exports = {hashStruct, value}


