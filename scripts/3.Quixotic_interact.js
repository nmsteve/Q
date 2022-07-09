
const { utils } = require("ethers");
const { ethers } = require("hardhat");
require('dotenv')
const {value,domain,types,values} = require('../sign/sign.js')

async function main() {

  //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  // We get the contract to deploy
  this.ExchangeV4 = await ethers.getContractFactory("ExchangeV4")
  this.PaymentERC20Registry = await ethers.getContractFactory("PaymentERC20Registry")
  this.Vasrewards = await ethers.getContractFactory("VasReward")
  this.sign = await ethers.getContractFactory('sign')
  this.CancellationRegistry =await ethers.getContractFactory('CancellationRegistry')
  this.NEONPETCollection = await ethers.getContractFactory('NeonPetCollection')
  this.ExchangeRegistry = await ethers.getContractFactory('ExchangeRegistry')
  
  //connect to  Quixotic MarketPlace
  this.ExchangeV4 =  this.ExchangeV4.attach(process.env.Q)
  this.PaymentERC20Registry = this.PaymentERC20Registry.attach(process.env.PR)
  this.Vasrewards = this.Vasrewards.attach(process.env.VR)
  this.CancellationRegistry = this.CancellationRegistry.attach(process.env.CR)
  this.ExchangeRegistry = this.ExchangeRegistry.attach(process.env.ER)
  this.sign = this.sign.attach(process.env.SG)
  this.NEONPETCollection = this.NEONPETCollection.attach(process.env.NP)
  
 //set up
//await this.ExchangeV4.setRegistryContracts(process.env.ER, process.env.CR,process.env.PR)
//await this.PaymentERC20Registry.addApprovedERC20(process.env.VR)
//await this.CancellationRegistry.addRegistrant(process.env.Q)
//await this.ExchangeRegistry.addRegistrant(process.env.Q)
//await this.ExchangeRegistry.removeRegistrant(process.env.Q)
//await this.ExchangeV4.setRoyalty(process.env.NP, process.env.ADDRESS0, 100)
//await  this.ExchangeV4.setMakerWallet(owner.address)

  // this.sign = await this.sign.deploy()
  // await this.sign.deployed()
  // console.log(`sign generator deployed at:${this.sign.address}`)


let signature = await user2._signTypedData(domain, types, values);
// console.log(`signature: ${signature} \n signature ${signature.length}`)
// const result= await this.sign.validateSellerSignature(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9], signature)
// console.log('Valid? ',result)


//seller
//await this.NEONPETCollection.connect(user2).setApprovalForAll(process.env.Q, true)

//buyer
//await this.Vasrewards.transfer(user3.address,utils.parseEther('100'))
//await this.Vasrewards.connect(user3).approve(this.ExchangeV4.address, utils.parseEther('100'))

//await 
await this.ExchangeV4.connect(user2).fillSellOrder(value[1],value[2],value[3],value[4], value[5], value[6],value[7], value[8], value[9], signature, user3.address)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
