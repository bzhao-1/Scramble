import React, { useState } from "react";
import "./Cell.css";

export default function Cell({ i, j, cellStyle, cellValue, children, haasTile }) {
    const[hasTile, setHasTile] = useState(haasTile);
    const[letter, setLetter] = useState(cellValue);
    const updatedStyle = {
        ...cellStyle,
        backgroundColor: hasTile? "gray" : cellStyle.backgroundColor,
    };

    const handleClick = () => {
        console.log("old: " + letter);
        if (hasTile) {
            alert("Tile is already filled!")
            return;
        }
        setHasTile(!hasTile);
        setLetter('B');
        console.log("new: " + letter);
        console.log(hasTile);
        console.log(i);
        return {
            letter: "B",
            xLoc: j,
            yLoc: i,
        }
        // setHasTile(!hasTile);
    }

    return (
        <div
            key={`${i}-${j}`}
            className={`cell ${cellStyle}`}
            onClick={() => handleClick()}
            style={{backgroundColor: hasTile? "gray" : "blue"}}
            // style={updatedStyle}
        >
            <div className="cell-content">
                {cellValue}
            </div>
        </div>
    );
};