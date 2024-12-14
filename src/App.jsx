import React, { useState } from 'react';
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Color, setPlayer1Color] = useState('#ff0000');
  const [player2Color, setPlayer2Color] = useState('#0000ff');
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center gap-4 w-50 py-5">
        {/* title */}
        <h1 className="mb-4 text-center title">Tic-Tac-Toe</h1>
        {/* PLayer's name and player's color */}
        {!gameStarted && (
        <div className="row mb-5 d-flex justify-content-center">
          <div className="row-md-6 player-form">
            <label className="form-label">Player 1 Name:</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control border-3 border-primary bg-custom-white"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
              <input
                type="color"
                className="form-control form-control-color mx-2 bg-custom-white border-3 border-primary"
                value={player1Color}
                onChange={(e) => setPlayer1Color(e.target.value)}
              />
            </div>
          </div>
          <div className="row-md-6 player-form">
            <label className="form-label">Player 2 Name:</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control border-3 border-primary bg-custom-white"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
              <input
                type="color"
                className="form-control form-control-color mx-2  border-3 border-primary bg-custom-white"
                value={player2Color}
                onChange={(e) => setPlayer2Color(e.target.value)}
              />
            </div>
          </div>
        </div>)}
        {/* game */}
        <Game
          player1Name={player1Name}
          player2Name={player2Name}
          player1Color={player1Color}
          player2Color={player2Color}
          gameStarted = {gameStarted}
          setGameStarted={setGameStarted}
        />
        </div>
    </div>
  );
}

export default App;