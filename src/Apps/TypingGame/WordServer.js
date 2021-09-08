import React from "react";
import "./style/Word.css";
import Char from "./Char"


class WordServer extends React.Component {
    constructor() {
        super();
        this.wordCounter = 0;
        this.pos = 0;
        this.length = 0;

        this.wordList = null;

        this.state = {
            currentWord: null,
            textColor: null
        };
        
    }

    static shuffle(list) {
        for (let len = list.length - 1; len > 0; len--) {
            let pos = Math.floor(Math.random() * len);
            [list[len], list[pos]] = [list[pos], list[len]];
        }
        return list;
    }

    static generateColor() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 20 + 70);
        const l = Math.floor(Math.random() * 20 + 70);
        return `hsl(${h}, ${s}%, ${l}%)`
    }

    fetchWordList() {
        fetch("http://localhost:3001/wordList")
            .then(response => response.json())
            .then(wordList => { 
                this.wordList = WordServer.shuffle(wordList);
                this.nextWord(); //ここでthis.currtntWordもセット
            });
    }
    

    nextChar() {
        let currentWord = this.state.currentWord;
        const char = currentWord[this.pos].props.char;
        const style = currentWord[this.pos].props.style;
        currentWord[this.pos] = <Char key={this.pos} className="typed" style={style}char={char}/>
        this.pos++;
        this.setState({
            currentWord: currentWord
        });
        if (this.pos >= this.length) { return true }
    }

    nextWord() {
        if (!this.wordList) { return; }
        const word = this.wordList[this.wordCounter++];
        if (word === undefined) {
            // throw new Error("No next word...");
            //無限ループの恐れがあるから、あとでちゃんと消す
            this.wordCounter = 0;
            this.nextWord();
            return;
            //
        }

        // wordのスタイル指定
        let fontSize;
        let padding;
        if (word.length < 10) {
            fontSize = "160px";
            padding = "0 10px";
        } else if (word.length < 14) {
            fontSize = "116px";
            padding = "0 6px";
        } else {
            fontSize = `${780 / word.length * 1.7}px`
            padding = "0 4px";

        }

        const style = {
            fontSize: fontSize,
            padding: padding,
        };
        const currentWord = word.split("").map((char, i) => {
            return <Char key={i} style={style} char={char} />
        });

        this.pos = 0;
        this.length = word.length;
        this.setState({
            currentWord: currentWord,
            textColor: WordServer.generateColor()
        });
    }

    componentDidMount() {
        this.fetchWordList();
        window.addEventListener("keydown", e => {
            if (this.pos >= this.length) { return; }
            try {

                if (e.key === this.state.currentWord[this.pos].props.char) {
                    const flag = this.nextChar();
                    if (flag) {
                        setTimeout(() => { this.nextWord() }, 200);
                    }
                }
            } catch (e) {
                console.log(this.state);
                console.log(this.wordCounter);
                console.log(this.pos);
                console.log(this.length);
                throw e;
            }
        });
    }

    render() {
        console.log("wordCounter: ", this.wordCounter);
        return (
            <div>
                <ul style={{ "--text-color": this.state.textColor }}>
                    {this.state.currentWord}
                </ul>
            </div>
        );
    }


}

export default WordServer;
