import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Tile.css";

export default function Tile(props) {
    const letter = 'A';
    console.log(props);

    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('tile_id', target.id);
    }

    const dragEnd = e => {
        e.stopPropagation();
    }

    return (
        <Draggable>
            <div id={props.id} className="tile" onDragStart={dragStart} onDragEnd={dragEnd}>{letter}</div>
        </Draggable>
        
    )
}

// function tileComeBack() {
    
// }