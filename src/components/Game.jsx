import React, { useState, useEffect, useRef } from 'react';
import Board from './Board';

function Game({ player1Name, player2Name, player1Color, player2Color, gameStarted, setGameStarted}) {
  // Game state variables
  const [board, setBoard] = useState(Array(9).fill(null));  
  const [score, setScore] = useState(Array(3).fill(0)) 
  const [isFirstGame, setFirstGame] = useState(true) 
  const [withIA, setWithIA] = useState("");  // Defines if the opponent is AI or a human player
  const [player1Time, setPlayer1Time] = useState(0);  // Time for last play of Player 1
  const [player2Time, setPlayer2Time] = useState(0);  // Time for last play of Player 1
  const [turnPlayer, setTurnPlayer] = useState(true);  // Indicates which player is to play (true = player1)
  const [info, setInfo] = useState(""); 

  // Variables who don't need to be re-rendered
  let nbFullBoxes = useRef(0);
  let isFinished = useState(false);
  let startTime = useRef(Date.now()); 


  // Variables for winner calculation and current player
  let winner = null;
  let textInfo = "";
  let oldBoard;
  let turn;

  // Function to handle clicks on the board
  const handleClick = (i) => {
    if ((withIA && !turnPlayer) || board[i]) return;

    // Play and make the needed changes
    oldBoard = board.slice();
    turn = turnPlayer;
    oldBoard = play(i, oldBoard, turn);

    // The IA play if the opponent is not a friend
    if (withIA && !isFinished.current) {
        setTimeout(() => {
          turn = !turn;
          play(playAI(oldBoard), oldBoard, false);
        }, 1000);
    }

  };

  /**
   * Play a move
   */
  function play(i, oldBoard, turn){
    // Update the game board
    const newBoard = oldBoard.slice();
    newBoard[i] = turn ? 'X' : 'O';
    setBoard(newBoard);
    setTurnPlayer(!turn);
    nbFullBoxes.current++;

    // Update the score and the information
    isFinished.current = updateGame(turn, newBoard);

    // Calculate the elapsed time
    if (turn) setPlayer1Time(Math.floor((Date.now() - startTime.current) / 1000));
    else setPlayer2Time(Math.floor((Date.now() - startTime.current) / 1000));
    startTime.current = Date.now();
    return newBoard;
  }

  /**
   * Change information of the game and return if the game is finished
   */
  function updateGame(turn, newBoard){
    // Check for a winner
    winner = calculateWinner(newBoard);

    // Update the information text
    textInfo = winner ? `Winner: ${turn ? player1Name : player2Name}` : (`Next player: ${turn ? player2Name : player1Name}`);
    setInfo(textInfo);

    // Check for the end of the game
    if(winner) {
      setGameStarted(false)
      return true;
    }
    if (nbFullBoxes.current == 9) {
      setInfo("It's a draw!");
      setGameStarted(false);
      return true;
    }
    return false;
  }

  // Function to start the game with a specified opponent (either IA or Friend)
  const launchGame = (opponent) => {
    setGameStarted(true);  
    setWithIA(opponent);  
    setScore(Array(3).fill(0));
    setFirstGame(false);
  };

  // Function to continue to play with the same opponent
  const continueGame = () => {
    let newScore = score;
    if(nbFullBoxes.current == 9) newScore[1] += 1;
    else newScore[turnPlayer ? 2 : 0] += 1;
    setScore(newScore);
    setGameStarted(true);  
  };

  // That's is usefull to reset when the game is over 
  useEffect(() => {
    if (gameStarted) {
      setBoard(Array(9).fill(null));  
      setPlayer1Time(0);
      setPlayer2Time(0);
      startTime.current = Date.now();
      nbFullBoxes.current = 0;
      isFinished.current = 0;
      setTurnPlayer(true);
      setInfo("You can play !!");
    }
  }, [gameStarted]);

  return (
    <div className="text-center">
      {!gameStarted && (
        <div className="mb-4">
          {!isFirstGame && (
            <button className="btn btn-success me-2" onClick={continueGame}>
              Continue
            </button>
          )}
          <button className="btn btn-success me-2" onClick={() => launchGame(isFirstGame ? false : withIA)}>
            {isFirstGame ? "Play with a friend" : "Reset the score"}
          </button>
          <button className="btn btn-primary" onClick={() => launchGame(true)}>
            Play with the computer
          </button>
        </div>
      )}

      {gameStarted && (
      <div className="info">
        <div style={{color: player1Color}}> {player1Name} : {player1Time}s</div>
        <div style={{color: player2Color}}> {player2Name} : {player2Time}s</div>
        <div className='d-flex gap-5 my-3'>
          <span style={{color: player1Color}}>{player1Name} : {score[0]} </span>
          <span>Draw : {score[1]} </span> 
          <span style={{color: player2Color}}> {player2Name} : {score[2]}</span>
        </div>
      </div>)}

      {gameStarted && (
        <Board
          boxes={board}
          onClick={handleClick}
          player1Color={player1Color}
          player2Color={player2Color}
        />
      )}
      <div className="mb-3 info mt-3">{info}</div>
    </div>
    
  );
}

/**
 * Function to check if there is a winner
 */
function calculateWinner(boxes) {
  // Check for winning rows and columns
  for (let i = 0; i < 3; i++) {
    if (boxes[i * 3] && boxes[i * 3] === boxes[i * 3 + 1] && boxes[i * 3] === boxes[i * 3 + 2]) 
      return boxes[i * 3];
    if (boxes[i] && boxes[i] === boxes[i + 3] && boxes[i] === boxes[i + 6]) 
      return boxes[i];
  }

  // Check for winning diagonals
  if (boxes[0] && boxes[0] === boxes[4] && boxes[0] === boxes[8])
    return boxes[0];

  if (boxes[2] && boxes[2] === boxes[4] && boxes[2] === boxes[6])
    return boxes[2];

  // No winner
  return null;  
}

/**
 * Play a move for the ai
 */
function playAI(boxes) {
    // Get an array of indices for the empty boxes
    const emptyBoxes = [];

    // Loop through the boxes and find the empty spots (null values)
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i] === null) {
        emptyBoxes.push(i);
        }
    }

    // Randomly pick one of the empty boxes
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    return emptyBoxes[randomIndex]; // Return the index of the selected empty box
}

export default Game;