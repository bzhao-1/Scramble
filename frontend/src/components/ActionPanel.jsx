import React, { useState } from 'react';
import Tile from './Tile';
import './ActionPanel.css';
import shuffleImage from '../assets/shuffle.jpg';
import refreshImage from '../assets/refresh.jpg';

const ActionPanel = (props) => {

    const [tiles, setTiles] = useState([]);
    const handleDrag = () => {
        setLetter('B');
    }
    for (let i = 0; i < 7; i++){
        tiles.push(<Tile key={i} onStop={handleDrag}/>);
    }
    console.log(tiles);

    

    return (
        <div className="action-panel">
            <div className="hand-container">
                <button className="button-hand"
                    style={{
                        backgroundImage: `url(${shuffleImage})`,
                    }}>
                </button>
                {tiles}
                <button className="button-hand"
                    style={{
                        backgroundImage: `url(${refreshImage})`,
                        backgroundSize: "30px",
                    }}>
                </button>
            </div>
            <div className="button-container">
                <button className="button-ap">Resign</button>
                <button className="button-ap">Skip</button>
                <button className="button-ap">Swap</button>
                <button className="button-ap submit-button">Submit</button>
            </div>
        </div>
    );
}

export default ActionPanel;