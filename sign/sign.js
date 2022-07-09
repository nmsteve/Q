const { utils } = require("ethers");



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

let seller = process.env.ADDRESS2
let contractAddress = process.env.NP
let tokenId = BigInt(1)
let startTime = 1657098127 // BigInt(Math.floor(Date.now() / 1000) - 60 * 10)
let expiration = 1657445900 //BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 10)
let price = utils.parseEther('0.001')
let quantity = BigInt(1)
let createdAtBlockNumber = 30398292
let paymentERC20 = process.env.VR

let values = {   seller:seller, 
                contractAddress:contractAddress,
                tokenId:tokenId,
                startTime:startTime,
                expiration:expiration,
                price:price,
                quantity:quantity,
                createdAtBlockNumber:30398292,
                 paymentERC20:paymentERC20
            }

let value = [[],seller,contractAddress,tokenId,startTime,expiration,price,quantity,createdAtBlockNumber,paymentERC20]

module.exports ={value, domain, types, values}
