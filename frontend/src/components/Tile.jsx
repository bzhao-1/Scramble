import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Tile.css";

export default function Tile(props) {
    const [letter, setLetter] = useState('A');

    const handleDrag = () => {
        setLetter('B');
    }

    return (
        <Draggable onStop={handleDrag}>
            <div className="tile">{letter}</div>
        </Draggable>
        
    )
}

// function tileComeBack() {
    
// }