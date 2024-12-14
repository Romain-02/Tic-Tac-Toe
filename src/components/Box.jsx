import React from 'react';

/* Component who represent a box of the board */
function Box({ value, onClick, player1Color, player2Color }) {
  return (
    <button
      className="btn border-4 border-dark p-3 box"
      style={{
        backgroundColor: value === 'X' ? player1Color : value === 'O' ? player2Color : 'rgba(255, 255, 255, 0.8)',
      }}
      onClick={onClick}
    >
    <span className="animated-letter typing-effect">{value}</span>
    </button>
  );
}

export default Box;