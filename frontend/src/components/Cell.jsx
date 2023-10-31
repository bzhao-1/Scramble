import React, { useState } from "react";
import "./Cell.css";
import { boardTiles } from "./Board";

export default function Cell({ i, j, cellStyle, children, tile, onTileDrop }) {

    const key = `${i}-${j}`; // key for the tilePositions object

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedLetter = e.dataTransfer.getData("letter");
        // console.log(droppedLetter);
        const droppedId = e.dataTransfer.getData("id");
        boardTiles[droppedLetter] = [j, i];
        console.log(boardTiles);
        onTileDrop(droppedId, key, droppedLetter);
    };

    const handleDragOver = (e) => {
        e.preventDefault();  // This is important to allow dropping
    };

    return (
        <div
            className={`cell ${cellStyle}`}
            onDrop={tile ? undefined : handleDrop}
            onDragOver={tile ? undefined : handleDragOver}
        >
            <div className="cell-content">
                {tile ? tile : children}
            </div>
        </div>
    );
};