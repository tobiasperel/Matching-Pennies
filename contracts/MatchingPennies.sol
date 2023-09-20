pragma solidity ^0.8.9;


contract MatchingPennies  {


    struct Game {
        address payable player1;
        address payable player2;
        bytes32 player1ChoiceHashed;
        bytes32 player2ChoiceHased;
        uint8 player1Choice;
        uint8 player2Choice;
        bool hasChosen;
        bool played;
        bool createGame;
    }
    mapping (address => Game) private games;

    event winner(address winner, address looser);

    function CreateGame(address payable opponent) public  {
        require(msg.sender != opponent, "You can't play against yourself");
        games[msg.sender] = Game(payable(msg.sender), opponent, 0, 0, 0, 0, false, false,true);
        games[opponent] = Game(opponent, payable(msg.sender), 0, 0, 0, 0, false, false,false);
    }

    function getGame(address person) public view returns (address, address, bytes32,bytes32, bool, bool,bool) {
        return (games[person].player1, games[person].player2 , games[person].player1ChoiceHashed,games[person].player2ChoiceHased, games[person].hasChosen, games[person].played,games[person].createGame);
    }

    function setChoiceHashed(bytes32 _choiceHashed) public payable{
        require(msg.value == 0.1 ether, "You must bet the price of the game");
        require(games[msg.sender].hasChosen == false, "You already chose a choice");
        require(games[msg.sender].played == false, "You already played this game");
        games[msg.sender].player1ChoiceHashed = _choiceHashed;
        games[games[msg.sender].player2].player2ChoiceHased = _choiceHashed;
        games[msg.sender].hasChosen = true;
    }

    function revealChoice(uint8 _choice, uint16 _nonce) public {
        require(_choice == 1 || _choice == 2, "You must choose 1 or 2");
        require(games[msg.sender].hasChosen == true, "You must choose a choice first");
        require(games[msg.sender].played == false, "You already played this game");
        require(games[msg.sender].player1Choice == 0 , "You already revealed your choice");
        require(games[msg.sender].player1ChoiceHashed == keccak256(abi.encodePacked(_choice, _nonce)), "Your choice doesn't match the hashed choice");
        games[msg.sender].player1Choice = _choice;
        games[games[msg.sender].player2].player2Choice = _choice;
    }

    function encodePacked(uint8 _choice, uint16 _nonce) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_choice, _nonce));
    }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function play(address opponent) public  {
        require(games[msg.sender].played == false, "You already played this game");
        require(games[msg.sender].player2 == opponent, "You are not playing against this opponent");
        require(games[msg.sender].player1Choice != 0 && games[msg.sender].player2Choice != 0, "both must set a choice");
        require( (games[msg.sender].player1Choice == 1 || games[msg.sender].player1Choice == 2)  &&  (games[msg.sender].player2Choice == 1 || games[msg.sender].player2Choice == 2));
        
        games[msg.sender].played = true;
        games[opponent].played = true;
        if (games[msg.sender].player1Choice == games[msg.sender].player2Choice && games[msg.sender].createGame == true ) { // if both players choose the same, player1 wins
            emit winner(msg.sender, opponent);
            games[msg.sender].player1.transfer(0.2 ether);
        }
        else if (games[msg.sender].player1Choice == games[msg.sender].player2Choice && games[msg.sender].createGame == false ) { // if both players choose the same, player1 wins
            emit winner(opponent,msg.sender);
            games[msg.sender].player2.transfer(0.2 ether);
        } 
        else if (games[msg.sender].player1Choice != games[msg.sender].player2Choice && games[msg.sender].createGame == true ) {
            emit winner(opponent, msg.sender);
           games[msg.sender].player2.transfer(0.2 ether); 
        }
        else if (games[msg.sender].player1Choice != games[msg.sender].player2Choice && games[msg.sender].createGame == false ) {
            emit winner(msg.sender, opponent);
           games[msg.sender].player1.transfer(0.2 ether); 
        }
        
        
    }

}
