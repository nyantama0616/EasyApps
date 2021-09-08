import React from "react";
import "./style/TypingGame.css"
import WordServer from "./WordServer";

class TypingGame extends React.Component {
    render() {
        return (
            <div id="typing-game">
                <WordServer/>
            </div>
        );
    }
}

export default TypingGame;
