import React from 'react';
import Box from './Box';

/* Component who represent the Board of the game */
function Board({ boxes, onClick, player1Color, player2Color }) {
  return (
    <div className="d-flex flex-wrap justify-content-center board">
      {boxes.map((box, index) => (
        <Box
          key={index}
          value={box}
          onClick={() => onClick(index)}
          player1Color={player1Color}
          player2Color={player2Color}
        />
      ))}
    </div>
  );
}

export default Board;