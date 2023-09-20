import { ethers } from "hardhat";
async function main() {
  const contractAddress = "0x92a3A0C1236b5e70Ef88963152ee01c2E5bc1071"; // Sustituye por la dirección de tu contrato en la cadena
  const [deployer] = await ethers.getSigners();
  const jugador2 = "0xcb0fF44D7818640F558Ec699d1cfCB8e3ff41489"
  // Conecta al contrato utilizando la dirección y la ABI
  const Contract = await ethers.getContractFactory("MatchingPennies"); // Reemplaza 'MatchingPennies' con el nombre de tu contrato
  const contract = await Contract.attach(contractAddress);
  // Llama a una función de lectura del contrato (ejemplo)
  console.log("llamando desde la cuenta:", deployer.address)
  
  // const hash = await contract.encodePacked(1, 515);
  // console.log('hash:', hash.toString());
  const contractBalance = await contract.getBalance();
  console.log('balance del contrato:', contractBalance.toString());

  // const result2 = await contract.CreateGame(jugador2);
  // console.log('Partida creada:', result2.toString());

  // const result3 = await contract.setChoiceHashed("0xf1885eda54b7a053318cd41e2093220dab15d65381b1157a3633a83bfd5c9239");
  // console.log('jugador1 ha jugado:', result3.toString());

  // const result4 = await contract.revealChoice(1,515)
  // console.log('jugador1 ha revelado su jugada:', result4.toString());
  
  // const result5 = await contract.play(jugador2);
  // console.log('jugador2 ha jugado:', result5.toString());

  const result = await contract.getGame(jugador2); 
  console.log('data de los juegos', result.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
