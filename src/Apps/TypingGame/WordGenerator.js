import Word from "./WordServer"

class WordGenerator {
    constructor() {
        this.words = [
            "panda",
            "rabit",
            "koara"
        ];
        this.pos = 0;
    }

    nextWord() {
        const word = this.words[this.pos++];
        if (!word) { return null; }
        return <Word word={word}/>
    }
}

export default WordGenerator;
