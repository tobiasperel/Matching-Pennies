import { ethers } from "hardhat";
import { utils } from 'ethers'

async function main() {
  const MatchingPenniesFactory = await ethers.getContractFactory('MatchingPennies')  
  const MatchingPennies = await MatchingPenniesFactory.deploy(1)
  await console.log("Contract deployed to address:", MatchingPennies.address);
  // await MatchingPennies.deployed()
  console.log("Contract address:", MatchingPennies.address);
    console.log("Transaction hash:", MatchingPennies.deployTransaction.hash);

    // Esperar a que se mine la transacción de despliegue
    await MatchingPennies.deployTransaction.wait();
    
    console.log("Contract deployed successfully!");
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});