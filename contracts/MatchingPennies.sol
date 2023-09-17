pragma solidity ^0.8.9;


contract MatchingPennies {
    address payable public player1;
    address payable public player2;
    uint public betAmount;
    uint256 amountToSend;

    constructor (address payable _player1, address payable _player2) payable {
        player1 = _player1;
        player2 = _player2;
        betAmount = 0.1 ether;
        amountToSend = 0.1 ether;
    }

    bool public player1Choice;
    bool public player2Choice;


    function play(bool _player1Choice, bool _player2Choice) public payable {
        require(msg.value == betAmount, "You must bet the price of the game");
        player1Choice = _player1Choice;
        player2Choice = _player2Choice;
        if (player1Choice == player2Choice) { // if both players choose the same, pl
            player1.transfer(amountToSend);
        } else {
            player2.transfer(amountToSend);
        }
    }

}