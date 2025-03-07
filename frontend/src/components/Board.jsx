import React from "react";
import Cell from "./Cell.jsx";
import Tile from "./Tile.jsx";
import "../css/Board.css";

const Board = ({ onTileDrop, letterUpdates, scoredLetters }) => {

    /**
     * Umbrella component for the board.
     * Initializes all the cells inside it and assigns tiles to them based on the data.
     * @param {*} i 
     * @param {*} j 
     * @returns 
     */

    function getTiles (i, j) {
        /**
         * Determines whether we should a place a tile on the cell.
         * If it is in letterUpdates, then it has just been dragged from the hand.
         * If it is in scoredLetters, then it has been returned by the server.
         * Otherwise we just return the cell itself.
         */
        const cellKey = `${i}-${j}`;
        const tileId = Object.keys(letterUpdates).find(id =>
            letterUpdates[id] && letterUpdates[id][0] === cellKey
        );

        if (tileId) {
            const [, letter] = letterUpdates[tileId];
            return <Tile letter={letter} id={tileId} />;
        } else if (scoredLetters.hasOwnProperty(cellKey)) {
            return <Tile letter={scoredLetters[cellKey]} id="noid" draggable={false} />;
        }
        return null;
    }

    // double letters and so on
    const tw = [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]];
    const dw = [[1, 1], [2, 2], [3, 3], [4, 4], [10, 10], [11, 11], [12, 12], [13, 13],
    [1, 13], [2, 12], [3, 11], [4, 10], [10, 4], [11, 3], [12, 2], [13, 1]];
    const tl = [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9],
    [9, 13], [13, 5], [13, 9]];
    const dl = [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6],
    [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0],
    [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]];

    const rows = [];

    for (let i = 0; i < 15; i++) { // make a board
        const cells = []; // cells for each row

        for (let j = 0; j < 15; j++) {
            let cellStyle = "";
            let cellValue = "";

            if (i === 7 && j === 7) { // center cell
                cellStyle = "star";
                cellValue = "★";
            } else if (tw.some(coord => coord[0] === i && coord[1] === j)) {
                cellStyle = "tw";
                cellValue = "TW";
            } else if (dw.some(coord => coord[0] === i && coord[1] === j)) {
                cellStyle = "dw";
                cellValue = "DW";
            } else if (tl.some(coord => coord[0] === i && coord[1] === j)) {
                cellStyle = "tl";
                cellValue = "TL";
            } else if (dl.some(coord => coord[0] === i && coord[1] === j)) {
                cellStyle = "dl";
                cellValue = "DL";
            }

            cells.push(
                // push the Cell component into the row
                <Cell
                    key={`${i}-${j}`}
                    i={i}
                    j={j}
                    cellStyle={cellStyle}
                    children={cellValue}
                    tile={getTiles(i, j)}
                    onTileDrop={onTileDrop}
                />
            );
        }
        rows.push(<div key={i} className="row">{cells}</div>); // push the row into the board
    }

    return (
        <div id="board">
            {rows}
        </div>
    );
}

export default Board;