
const { ethers } = require("hardhat");

async function main() {

    //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  this.sign = await ethers.getContractFactory('sign')
  
  this.sign = await this.sign.deploy()
  await this.sign.deployed()
  console.log(`sign generator deployed at:${this.sign.address}`)

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
