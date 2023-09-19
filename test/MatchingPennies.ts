import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

describe("MatchingPennies contract", function () {
  let owner: Signer;
  let player1: Signer;
  let player2: Signer;
  let matchingPennies: any; // Cambia 'any' por el tipo adecuado de tu contrato

  beforeEach(async () => {
    [owner, player1, player2] = await ethers.getSigners();
    const MatchingPenniesFactory = await ethers.getContractFactory("MatchingPennies"); // Asegúrate de que el nombre del contrato sea correcto
    matchingPennies = await MatchingPenniesFactory.deploy(1); // Puedes ajustar el valor del parámetro según tus necesidades
    // await matchingPennies.deployed();
  });

  it("should allow creating a game", async () => {
    await matchingPennies.connect(player1).CreateGame(await player2.getAddress());
    const gameData = await matchingPennies.getGame();
    const [player1Address, player2Address, hasChosen, played] = gameData;
    
    expect(player1Address).to.equal(player1.address);
    expect(player2Address).to.equal(player2.address);
    expect(hasChosen).to.equal(false); // Debería ser false porque aún no se ha elegido una opción
    expect(played).to.equal(false);

  });
/*
  it("should allow setting a choice hashed", async () => {
    
    await matchingPennies.connect(player1).CreateGame(await player2.getAddress());
    await matchingPennies.connect(player1).setChoiceHashed("0x123456"); // Cambia el valor por el que desees
    // Agrega aserciones para verificar que la elección se ha establecido correctamente
  });

  it("should allow revealing a choice", async () => {
    await matchingPennies.connect(player1).CreateGame(await player2.getAddress());
    await matchingPennies.connect(player1).setChoiceHashed("0x123456"); // Cambia el valor por el que desees
    await matchingPennies.connect(player2).revealChoice(1, 123); // Cambia los valores por los que desees
    // Agrega aserciones para verificar que la elección se ha revelado correctamente
  });

  it("should allow playing a game", async () => {
    await matchingPennies.connect(player1).CreateGame(await player2.getAddress());
    await matchingPennies.connect(player1).setChoiceHashed("0x123456"); // Cambia el valor por el que desees
    await matchingPennies.connect(player2).revealChoice(1, 123); // Cambia los valores por los que desees
    await matchingPennies.connect(player1).play(await player2.getAddress());
    // Agrega aserciones para verificar el resultado del juego
  });*/
});
