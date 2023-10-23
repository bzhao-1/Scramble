import React from "react";
import Cell from "./Cell.jsx";
import Tile from "./Tile.jsx";
import "./Board.css";
import Cell from "./Cell"

const Board = ({ tilePositions }) => {

    const [hasTile, setHasTile] = useState(false);

    const handleClick = (e) => {
        e.target.hasTile = !e.target.hasTile;
        logger(e);
        setHasTile(!hasTile);
    }

    const logger = (e) => {
        console.log(e.target);
        // console.log(e.target.innerHTML);
    }
    // double letters and so on
    const tw = [[0, 0], [0, 7], [0,14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]];
    const dw = [[1, 1], [2, 2], [3, 3], [4, 4],[10, 10], [11, 11], [12, 12], [13, 13],
                [1, 13], [2, 12], [3, 11], [4, 10],[10, 4], [11, 3], [12, 2], [13, 1]];
    const tl = [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9],
                [9, 13], [13, 5], [13, 9]];
    const dl = [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6],
                [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0],
                [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]];

    const rows = [];
    const letter = '';
    for (let i = 0; i < 15; i++) { // make a board
        const cells = [];

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
                // <Cell
                //     key={`${i}-${j}`}
                //     i={i}
                //     j={j}
                //     cellStyle={cellStyle}
                //     children={i === 4 && j === 10 && tiles.length >= 4 ? 
                //         tiles[3] : cellValue}
                //     style={{backgroundColor: isHovered ? "gray" : "navy"}} 
                //     onClick={(e) => logger(e)}
                //     // style={{
                //     //     backgroundColor: isHovered ? 'gray' : '',
                //     //     color: isHovered ? 'white' : '',
                //     // }}
                // >{cellValue}</Cell>
                <div 
                    key={`${i}-${j}`}
                    i={i}
                    j={j}
                    cellStyle={cellStyle}
                    children={tilePositions[`${i},${j}`] ? <Tile letter={tilePositions[`${i},${j}`]} /> : cellValue}
                    onClick={(e) => handleClick(e)}>
                </div>
            );
        }
        rows.push(<div style={{display:"flex"}} key={i} className="row">{cells}</div>);
    }

    

    // const drop = () => {
    //     dragOverItem.letter = "B"
    //     splitted = dragOverItem.key.split('-')
    //     row = splitted[0]
    //     col = splitted[1]
    //     const copyBoard = [...board];
    //     // copyBoard.splice(dragItem.current, 1);
    //     // copyBoard.splice(dragOverItem.current, 0, dragItemContent);
    //     copyBoard.splice(dragOverItem.key, 1, dragOverItem)
    //     setBoard(copyBoard);
    // }
    

    const test = 'A';

    return (
        <div id="board">
            {rows}
            <div id="test" style={{backgroundColor: hasTile ? "gray" : "navy"}} onClick={(e) => handleClick(e)}>{test}</div>
        </div>
    );
}

export default Board;