import React from "react";
import Tile from "./Tile.jsx"
import "./Hand.css";

export default function Hand() {
    let tiles = [];
    for (let i = 0; i < 7; i++){
        tiles.push(<Tile key={i} />);
    }

    const dropTile = e => {
        e.preventDefault();
        const tile_id = e.dataTransfer.getData('tile_id');
        const tile = document.getElementById(tile_id);
        e.target.appendChild(card);
    }

    return (
        <div className="hand" onDrop={dropTile}>
            {tiles}
        </div>
    );   
}