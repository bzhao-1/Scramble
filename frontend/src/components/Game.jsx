import React, { useState, useRef } from 'react';
import Board from "./Board";
import ActionPanel from "./ActionPanel";
import Infoboard from "./Infoboard";
import Tile from './Tile';
import './Game.css';

function Game() {
  let tiles = []; // hardcoding this data for now
  for (let i = 0; i < 7; i++) {
    tiles.push(<Tile key={i} />); // will be passed by the server in the future
  }

  let tilePositions = [[4, 10, "I"], [6, 7, "J"]]; // hardcoding the cell positions for now as well

  const [board, setBoard] = useState(Board.rows);
  const [test, setTest] = useState(Board.test);
  const [activePiece, setActivePiece] = useState();
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

  const updateBoard = () => {
    var updatedTile = document.getElementById("test");
    updatedTile.test = 'B'
  }

  return (
    <div>
      <div className="board-score">
        {board.rows.map((, )) => (
          
        )}
        <Board tiles={tiles} tilePositions={tilePositions} />
        <Infoboard/>
      </div>
      <ActionPanel tiles={tiles} />
    </div>
  );
};

export default Game;