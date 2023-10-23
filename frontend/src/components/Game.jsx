import React, { useState, useRef } from 'react';
import Board from "./Board";
import ActionPanel from "./ActionPanel";
import Infoboard from "./Infoboard";
import Tile from './Tile';
import './Game.css';

export let tilePositions = [
  {letter: "I", xLoc: 4, yLoc: 10},
  {letter: "J", xLoc: 6, yLoc: 7}
 ];

function Game() {
   // hardcoding the cell positions for now as well

  // const [tilePositions, setTilePositions] = useState({}); // function for placing the tiles onto the board

  // function updateTilePositions(change) { // wrapper to be passed to the action panel
  //   setTilePositions(change);
  // };

  let tiles = []; // hardcoding this data for now
  for (let i = 0; i < 7; i++) {
    tiles.push(<Tile
      key={i}
      letter='A'
      tilePositions={tilePositions}
      // updateTilePositions={updateTilePositions}
    />); // will be passed by the server in the future
  }

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

  const submit = () => {
    const baseURL = ""
    const url = baseURL + "/"
    const data = JSON.stringify(tilePositions)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
  }

  return (
    <div>
      <div className="board-score">
        {/* {board.map((row, )) => (
          {row.map((cell, )) => (
            <div 
                key={`${i}-${j}`}
                id={`${i}-${j}`}
                // hasTile={false}
                style={{backgroundColor: e.target ? "gray" : "navy"}} 
                className="cell"
                onClick={(e) => handleClick(e)}>
                {cellValue}
              </div>
          )}
        )} */}
        <Board tiles={tiles} tilePositions={tilePositions} />
        <Infoboard/>
      </div>
      <ActionPanel
        tiles={tiles}
      />
    </div>
  );
};

export default Game;