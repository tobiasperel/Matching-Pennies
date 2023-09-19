import { ethers } from "hardhat";
async function main() {
  const contractAddress = "0x0De68314EE482247FBC86b6279EeE82E14555808"; // Sustituye por la dirección de tu contrato en la cadena
  const [deployer] = await ethers.getSigners();
  const jugador2 = "0xcb0fF44D7818640F558Ec699d1cfCB8e3ff41489"
  // Conecta al contrato utilizando la dirección y la ABI
  const Contract = await ethers.getContractFactory("MatchingPennies"); // Reemplaza 'MatchingPennies' con el nombre de tu contrato
  const contract = await Contract.attach(contractAddress);
  // Llama a una función de lectura del contrato (ejemplo)
  console.log("llamando desde la cuenta:", deployer.address)
  
  // const result2 = await contract.CreateGame(jugador2);
  // console.log('Partida creada:', result2.toString());
  
  // const result3 = await contract.setChoiceHashed("0x6a756761646f7232000000000000000000000000000000000000000000000001");
  // console.log('jugador1 ha jugado:', result3.toString());

  const result4 = await contract.revealChoice(1,"jugador1")
  console.log('jugador1 ha revelado su jugada:', result4.toString());
  
  const result = await contract.getGame(); // Reemplaza 'someFunction' con el nombre de la función que deseas llamar
  console.log('data de los juegos', result.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
