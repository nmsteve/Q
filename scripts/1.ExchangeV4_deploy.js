
const { ethers } = require("hardhat");
const { utils} = require("ethers");

async function main() {

  //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  // We get the contract to deploy
  this.ExchangeV4 = await ethers.getContractFactory("ExchangeV4")
  
  //deploy Quixotic MarketPlace
  this.ExchangeV4 = await this.ExchangeV4.deploy()
  await this.ExchangeV4.deployed()
  console.log(`Quixotic  MarketPlace Deployed at:${this. ExchangeV4.address}`)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
