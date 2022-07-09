
const { utils } = require('ethers');
const { ethers } = require('hardhat');
//let Web3 = require('web3');
//const web3 = new Web3(process.env.POLYGON_MUMBAI_ALCHEMY);

let owner 
let signature
let digest

async function main() {

  //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.

  //signature
signature = await owner.signMessage(digest)
console.log(`signature off-chain: ${signature} \n HashLenght ${signature.length}`)
}
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


//hashStruct(s : 𝕊) = keccak256(typeHash ‖ encodeData(s)) where typeHash = keccak256(encodeType(typeOf(s)))
//domainSeparator = hashStruct(eip712Domain)


//let fnSignatureSellOrder = web3.utils.keccak256("SellOrder(address seller,address contractAddress,uint256 tokenId,uint256 startTime,uint256 expiration,uint256 price,uint256 quantity,uint256 createdAtBlockNumber,address paymentERC20)")
let typeHash = ethers.utils.keccak256(utils.toUtf8Bytes("SellOrder(address seller,address contractAddress,uint256 tokenId,uint256 startTime,uint256 expiration,uint256 price,uint256 quantity,uint256 createdAtBlockNumber,address paymentERC20)"))
//console.log(`typeHash: ${typeHash} \n HashLenght ${typeHash.length}`)


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
let tokenId = BigInt(12)
let startTime = 1657098127 // BigInt(Math.floor(Date.now() / 1000) - 60 * 10)
let expiration = 1657357327 //BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 10)
let price = utils.parseEther('0.001')
let quantity = BigInt(1)
let createdAtBlockNumber = BigInt(30398292)
let paymentERC20 = process.env.VR

let value = [typeHash, seller, contractAddress,tokenId,startTime, expiration,price, quantity,createdAtBlockNumber, paymentERC20]
//console.log("Values:",value[0])

//let fnParamsSellOrder = web3.eth.abi.encodeParameters(dataType,value);
let abiCoder = new ethers.utils.AbiCoder()
let encodeData = abiCoder.encode(dataType,value)

let structHash = ethers.utils.keccak256(encodeData)
//console.log(`structHash off-chain: ${structHash } \n HashLenght ${structHash.length}`)


let EIP712_DOMAIN_TYPE_HASH = utils.keccak256(utils.toUtf8Bytes("EIP712Domain(string name,string version)"));

let DOMAIN_DATA_TYPE = ['uint256','string','string']

let name = 'Quixotic'
let version ='4'

let DOMAIN_Value = [EIP712_DOMAIN_TYPE_HASH,name,version]

let DOMAIN_encoded = abiCoder.encode(DOMAIN_DATA_TYPE, DOMAIN_Value)

let DOMAIN_SEPARATOR = utils.keccak256(DOMAIN_encoded)
//console.log(`DOMAIN_SEPARATOR off-chain: ${structHash } \n HashLenght ${DOMAIN_SEPARATOR.length}`)


//pack together abi.encodePacked("\x19\x01", domainSeparator, structHash));
let encodePacked =  ethers.utils.concat([
  ethers.utils.toUtf8Bytes('\x19\x01'), 
  ethers.utils.arrayify(DOMAIN_SEPARATOR),
  ethers.utils.arrayify(structHash)
]
)

digest = utils.keccak256(encodePacked)
console.log(`digest off-chain: ${structHash } \n HashLenght ${digest.length}`)


module.exports ={signature, value}


//const {0:structHash,1:digest}= await this.sign.getHash(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9])
//console.log('Digest on-chain',digest )

// const arrayifyMessage = ethers.utils.arrayify(digest)
//     //console.log(arrayifyMessage)
//     const signature = await new ethers.Wallet(
//       process.env.PRIVATE_KEY0,
//     ).signMessage(arrayifyMessage)
//     console.log(signature)

//const signature = await owner.signMessage(digest)


