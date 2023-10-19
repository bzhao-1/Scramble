import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Tile.css";

export default function Tile(props) {
    const [letter, setLetter] = useState('A');
    const [clicked, setClicked] = useState(false);

    return (
        // <Draggable onStop={handleDrag}>
        //     <div className="tile">{letter}</div>
        // </Draggable>
        <button  onClick={() => setClicked(!clicked)}>
            <div className="tile">{letter}</div>
        </button>
    )
}

// function tileComeBack() {
    
// }