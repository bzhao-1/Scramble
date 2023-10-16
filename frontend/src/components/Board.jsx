import React, { useRef, useState } from "react";
import "./Board.css";

const Board = () => {
    const rows = [];
    const letter = 'A';
    for (let i = 0; i < 15; i++) { // make a board
        const cells = [];

        for (let j = 0; j < 15; j++) {
            cells.push(
                <div
                    className="cell"
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnd={(e) => dragEnter(e, index)}
                >{letter}</div>
            );
        }
        rows.push(<div style={{display:"flex"}} key={i}>{cells}</div>);
    }

    const [board, setBoard] = useState(rows);
    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    }

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    }

    return (
        <div id="board">
            {board}
        </div>
    );
}

export default Board;