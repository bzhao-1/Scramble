import React, { useState, useRef } from 'react';
import Board from "./Board";
import ActionPanel from "./ActionPanel";
import Tile from "./Tile"
import Infoboard from "./Infoboard";
import './Game.css';

function Game() {
  const [board, setBoard] = useState(Board.rows);
  const [test, setTest] = useState(Board.test);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
      dragItem.current = position;
      console.log(e.target.innerHTML);
      console.log(board);
  }

  const dragEnter = (e, position) => {
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
  }

  const drop = () => {
      console.log(dragItem);
      console.log(dragOverItem);
      setTest('B');
  }

  const handleDrag = () => {
    Tile.setLetter('B');
  }

  return (
    <div>
      <div className="board-score" onDragStart={dragStart}>
        <Board /> 
        <Infoboard />
      </div>
      <ActionPanel onStop={drop}/>
    </div>
  );
};

export default Game;