import React from "react";
import {leftStyle, rightStyle} from "../constants";

type GameStepProps = {
    step: number;
    equation: string;
    result: number;
    username: string;
    index: number
}

const GameStep: React.FC<GameStepProps> = ({ step, equation, result, username, index }) => (
    <div className="game-step"
        // @ts-ignore
         style={index % 2 === 0 ? leftStyle : rightStyle}
         data-testid="game-step"
    >
        <div className="Q-A">
            <div className="player-info">
                <img src="player.png" alt="player" />
                <span>{username}</span>
            </div>
            <div className="step">{step}</div>
            <div className="equation big">{equation}</div>
            <div className="result big">{result}</div>
        </div>
    </div>
);

export default GameStep;
