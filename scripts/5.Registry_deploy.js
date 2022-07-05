
const { ethers } = require("hardhat");

async function main() {

  //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  // We get the contract to deploy
  this.CancellationRegistry = await ethers.getContractFactory("CancellationRegistry")
  this.PaymentERC20Registry = await ethers.getContractFactory("PaymentERC20Registry")
  this.ExchangeRegistry =     await ethers.getContractFactory("ExchangeRegistry")
  
  //deploy CancellationRegistry
  this.CancellationRegistry = await this.CancellationRegistry.deploy()
  await this.CancellationRegistry.deployed()
  console.log(`CancellationRegistry  MarketPlace Deployed at:${this. CancellationRegistry.address}`)


  //deploy PaymentERC20Registry
  this.PaymentERC20Registry = await this.PaymentERC20Registry.deploy()
  await this.PaymentERC20Registry.deployed()
  console.log(`PaymentERC20Registry  MarketPlace Deployed at:${this.PaymentERC20Registry.address}`)

   //deploy ExchangeRegistry
  this.ExchangeRegistry = await this.ExchangeRegistry.deploy()
  await this.ExchangeRegistry.deployed()
  console.log(`ExchangeRegistry  MarketPlace Deployed at:${this.ExchangeRegistry.address}`)
 


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
