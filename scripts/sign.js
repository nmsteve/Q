const { utils } = require("ethers");
const { ethers } = require("hardhat");

async function main() {

//get singers
[owner, user1, user2, user3] = await ethers.getSigners()

// All properties on a domain are optional
const domain = {
    name: 'Quixotic',
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
let createdAtBlockNumber = 30398292
let paymentERC20 = process.env.VR

let value = {   seller:seller, 
                contractAddress:contractAddress,
                tokenId:tokenId,
                startTime:startTime,
                expiration:expiration,
                price:price,
                quantity:quantity,
                createdAtBlockNumber:30398292,
                 paymentERC20:paymentERC20
            }

const signature = await owner._signTypedData(domain, types, value);

console.log(`signature: ${signature} \n signature ${signature.length}`)
// '0x463b9c9971d1a144507d2e905f4e98becd159139421a4bb8d3c9c2ed04eb401057dd0698d504fd6ca48829a3c8a7a98c1c961eae617096cb54264bbdd082e13d1c'
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
