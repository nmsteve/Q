
const { utils } = require("ethers");
const { ethers } = require("hardhat");
require('dotenv')
const {value, structHash} = require('./signature.js')

async function main() {

  //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  // We get the contract to deploy
  this.ExchangeV4 = await ethers.getContractFactory("ExchangeV4")
  this.PaymentERC20Registry = await ethers.getContractFactory("PaymentERC20Registry")
  this.Vasrewards = await ethers.getContractFactory("VasReward")
  this.sign = await ethers.getContractFactory('sign')
  
  //connect to  Quixotic MarketPlace
  this.ExchangeV4 =  this.ExchangeV4.attach(process.env.Q)
  this.PaymentERC20Registry = this.PaymentERC20Registry.attach(process.env.PR)
  this.Vasrewards = this.Vasrewards.attach(process.env.VR)
  //this.sign = this.sign.attach(process.env.SG)
  this.sign = await this.sign.deploy()
  await this.sign.deployed()
  console.log(`sign generator deployed at:${this.sign.address}`)

  //set regestry
//await this.ExchangeV4.setRegistryContracts(process.env.ER, process.env.CR,process.env.PR)

//Approve our reward token
//await this.PaymentERC20Registry.addApprovedERC20(process.env.VR)

// if(await this.PaymentERC20Registry.isApprovedERC20(process.env.VR) == true)
// {
//   console.log(`Vas Rewards Approved`)
// } else {
//   console.log(`Vas Rewards NotApproved`)
// }
// console.log(value[1], '  ', owner.address)
// const {0:structHash,1:digest}= await this.sign.getHash(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9])
// console.log('StruckHash on-chain',structHash,'\n','Digest on-chain',digest )

// const arrayifyMessage = ethers.utils.arrayify(digest)
//     console.log(arrayifyMessage)
//     const flatSignature = await new ethers.Wallet(
//       process.env.PRIVATE_KEY0,
//     ).signMessage(arrayifyMessage)
//     console.log(flatSignature)



// All properties on a domain are optional
const domain = {
    name: "Quixotic",
    version: '4',
    // chainId: 1,
    // verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
   
};

// The named list of all type definitions
const types = {
    SellOrder: [
        { name: 'seller', type: 'address' },/* Seller of the NFT */
        { name: 'contractAddress', type: 'address' },/* Contract address of NFT */ 
        { name: 'tokenId', type:'uint256'},/* Token id of NFT to sell */
        {name:'startTime', type:'uint256'}, /* Start time in unix timestamp */
        {name:'expiration',type:'uint256'}, /* Expiration in unix timestamp */
        {name:'price',type:'uint256'}, /* Price in wei */
        {name:'quantity',type:'uint256'},/* Number of tokens to transfer; should be 1 for ERC721 */
        {name:'createdAtBlockNumber',type:'uint256'}, /* Block number that this order was created at */
        {name:'paymentERC20', type:'address'} /* Address of the ERC20 token for the payment. Will be the zero-address for payments in native ETH. */

    ]
};
let seller = process.env.ADDRESS0
let contractAddress = process.env.NP
let tokenId = BigInt(12)
let startTime = BigInt(Math.floor(Date.now() / 1000) - 60 * 10)
let expiration = BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 10)
let price = utils.parseEther('0.001')
let quantity = BigInt(1)
let createdAtBlockNumber = BigInt(30398292)
let paymentERC20 = process.env.VR

let values = {   seller:seller, 
                contractAddress:contractAddress,
                tokenId:tokenId,
                startTime:startTime,
                expiration:expiration,
                price:price,
                quantity:quantity,
                createdAtBlockNumber:createdAtBlockNumber,
                 paymentERC20:paymentERC20
            }

const signature = await owner._signTypedData(domain, types, values);

console.log(`signature: ${signature} \n signature ${signature.length}`)
// '0x463b9c9971d1a144507d2e905f4e98becd159139421a4bb8d3c9c2ed04eb401057dd0698d504fd6ca48829a3c8a7a98c1c961eae617096cb54264bbdd082e13d1c'


//const signature = await owner.signMessage(digest)
//console.log('signature ',signature)
const result= await this.sign.validateSellerSignature(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9], signature)
console.log('Valid? ',result)



//Trasfer Tokens to user one so that can pay for order
await this.Vasrewards.transfer(user1.address, utils.parseEther('1000'))
await this.Vasrewards.connect(user1).approve(this.ExchangeV4.address,utils.parseEther('1000'))
await this.ExchangeV4.fillSellOrder(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9], signature, user1.address)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
