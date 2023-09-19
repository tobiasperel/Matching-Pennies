pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract MatchingPennies is Ownable {

    uint public betAmount;
    uint256 amountToSend = betAmount * 2;

    constructor(uint _betAmount)  {
        betAmount = _betAmount /1000;
    }

    struct Game {
        address payable player1;
        address payable player2;
        bytes32 player1ChoiceHashed;
        bytes32 player2ChoiceHased;
        uint8 player1Choice;
        uint8 player2Choice;
        bool hasChosen;
        bool played;
    }
    mapping (address => Game) private games;

    event winner(address winner, address looser);

    function CreateGame(address payable opponent) public  {
        require(msg.sender != opponent, "You can't play against yourself");
        games[msg.sender] = Game(payable(msg.sender), opponent, 0, 0, 0, 0, false, false);
        games[opponent] = Game(opponent, payable(msg.sender), 0, 0, 0, 0, false, false);
    }

    function getGame() public view returns (address, address, bool, bool) {
        return (games[msg.sender].player1, games[msg.sender].player2, games[msg.sender].hasChosen, games[msg.sender].played);
    }

    function setChoiceHashed(bytes32 _choiceHashed) public payable{
        require(msg.value == betAmount, "You must bet the price of the game");
        require(games[msg.sender].hasChosen == false, "You already chose a choice");
        require(games[msg.sender].played == false, "You already played this game");
        games[msg.sender].player1ChoiceHashed = _choiceHashed;
        games[msg.sender].hasChosen = true;
    }

    function revealChoice(uint8 _choice, uint8 _nonce) public {
        require(_choice == 1 || _choice == 2, "You must choose 1 or 2");
        require(games[msg.sender].hasChosen == true, "You must choose a choice first");
        require(games[msg.sender].played == false, "You already played this game");
        require(games[msg.sender].player2Choice == 0 , "You already revealed your choice");
        require(games[msg.sender].player1ChoiceHashed == keccak256(abi.encodePacked(_choice, _nonce)), "Your choice doesn't match the hashed choice");
        games[msg.sender].player1Choice = _choice;
    }

    function play(address  opponent) public  {
        require(games[msg.sender].played == false, "You already played this game");
        require(games[msg.sender].player2 == opponent, "You are not playing against this opponent");
        require(games[msg.sender].player1Choice != 0 && games[msg.sender].player2Choice != 0, "both must set a choice");
        require( (games[msg.sender].player1Choice == 1 || games[msg.sender].player1Choice == 2)  &&  (games[msg.sender].player2Choice == 1 || games[msg.sender].player2Choice == 2));
        if (games[msg.sender].player1Choice == games[msg.sender].player2Choice) { // if both players choose the same, player1 wins
            emit winner(msg.sender, opponent);
            games[msg.sender].player1.transfer(amountToSend);
        } else {
            emit winner(opponent, msg.sender);
           games[msg.sender].player2.transfer(amountToSend); // else player2 wins
        }
        games[msg.sender].played = true;
        games[opponent].played = true;
        
    }

    function changeBetAmount(uint _betAmount) public onlyOwner {
        betAmount = _betAmount;
    }

}
