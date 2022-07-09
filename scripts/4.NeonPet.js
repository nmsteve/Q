
const { ethers } = require("hardhat");
const {utils} =require('ethers')

async function main() {


[owner, user1, user2, user3, user4] = await ethers.getSigners()
console.log(`           Owner address:${user1.address}`)

//  //Deploy VASRewards
// this.VasReward = await ethers.getContractFactory("VasReward")
// this.VasReward = await this.VasReward.deploy('Vas Rewards','VAS', utils.parseEther('1000000000'))
// await this.VasReward.deployed()
// console.log(`VAS Rewards Deployed at:${this.VasReward.address}`)
this.VAS = await ethers.getContractAt('VasReward',process.env.VR)

// //deploy a collection 
// this.collection = await ethers.getContractFactory('NeonPetCollection')
// this.collection = await this.collection.deploy('NEON PET Collection','NEON',`${process.env.Json} `,user1.address)
// await this.collection.deployed()
// console.log("NEON PET Collection deployed at:",this.collection.address)

  //1.using getContractAt
this.NEON = await ethers.getContractAt("NeonPetCollection",process.env.NP)
// //2. using attach
// this.NEON = await ethers.getContractFactory("LaunchpadCollection"); 
// this.NEON = this.NEON.attach(NEONPETAddress)

  
//await this.NEON.connect(user1).setMaxTotalSupply(1000)
//await this.NEON.connect(user1).setMintPriceInWei(utils.parseEther('1'))
//await this.NEON.connect(user1).setMaxMintAmount(50)
//await this.NEON.connect(user1).enableMinting() 


//   //mint NFTs
//await this.VAS.transfer(user2.address, utils.parseEther("1000") )
//await this.VAS.connect(user2).approve(this.NEON.address, utils.parseEther("21"))
//await this.NEON.connect(user2).mint(20, this.VAS.address)
 

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
