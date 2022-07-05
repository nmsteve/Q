
const { ethers } = require("hardhat");
const { utils} = require("ethers");

async function main() {

  //get singers
  [owner, user1, user2, user3] = await ethers.getSigners()

  // We get the contract to deploy
  this.CollectionMinter = await ethers.getContractFactory("CollectionMinter")
  this.CollectionMinter = this.CollectionMinter.attach(process.env.CM)

  //deploy a collection using collection minter
  const tx = await this.CollectionMinter.createNewCollection(`${process.env.Json} `,
  'NEON PET Collection V4','NEON',owner.address
  )


  //Get collection address
  const NEONPETAddress = await this.CollectionMinter.getCollectionAddress(owner.address, 2)
  console.log("NEON PET Collection deployed at:",NEONPETAddress)
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
