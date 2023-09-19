import { ethers, upgrades } from 'hardhat';
import { Contract } from 'ethers';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  const contract = await ethers.getContractFactory('MatchingPennies');
  const deployedContract = await contract.deploy(1);
  console.log(`Contract deployed to: ${deployedContract .address}`);

  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
