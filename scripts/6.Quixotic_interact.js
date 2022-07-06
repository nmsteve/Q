
const { utils } = require("ethers");
const { ethers } = require("hardhat");
require('dotenv')
const {hashStruct, value} = require('./signature.js')

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
  this.sign = this.sign.attach(process.env.SG)

  
  
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
//console.log(value[8])
const signature = await this.sign.getSignature(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9])
console.log(signature)

//Trasfer Tokens to user one so that can pay for order
await this.Vasrewards.transfer(user1.address, utils.parseEther('1000'))
await this.Vasrewards.connect(user1).approve(this.ExchangeV4.address,utils.parseEther('1000'))
await this.ExchangeV4.fillSellOrder(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9], owner.signMessage(hashStruct), user1.address)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
