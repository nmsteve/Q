
const { ethers } = require("hardhat");
require('dotenv')

async function main() {

  //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  // We get the contract to deploy
  this.ExchangeV4 = await ethers.getContractFactory("ExchangeV4")
  this.PaymentERC20Registry = await ethers.getContractFactory("PaymentERC20Registry")
  
  //connect to  Quixotic MarketPlace
  this.ExchangeV4 =  this.ExchangeV4.attach(process.env.Q)
  this.PaymentERC20Registry = this.PaymentERC20Registry.attach(process.env.PR)
  
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



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
