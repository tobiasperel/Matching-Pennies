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
    expect(await matchingPennies.connect(player1).getGame()).to.equal(player1.getAddress(), player2.getAddress(),false, false);
    });

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
  });
});
