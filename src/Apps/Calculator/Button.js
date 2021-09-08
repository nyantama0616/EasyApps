import React from "react";
import "./style/Button.css";

class Button extends React.Component {
    static opHash = {
        "+": "+",
        "−": "-",
        "×": "*",
        "÷": "/"
    };

    constructor(props) {
        super(props);

        this.state = {
            className: null
        }

        this.app = props.app;
        this.value = props.value;

        if (!isNaN(this.value) || this.value === ".") {
            this.type = "number";
        } else if ("+−×÷".indexOf(this.value) !== -1) {
            this.type = "op";
        } else {
            this.type = "other"
        }
        // switch文にdefaltがないことによる警告を無効化
        // eslint-disable-next-line
        switch (this.type) { 
            case "number":
                this.clickEvent = this.pushNumber;
                break;
            case "op":
                this.clickEvent = this.operation;
                break;
            case "other":
                // switch文にdefaltがないことによる警告を無効化
                // eslint-disable-next-line
                switch (this.value) {
                    case "C":
                        this.clickEvent = this.clear;
                        break;
                    case "±":
                        this.clickEvent = this.plusMinus;
                        break;
                    case "%":
                        this.clickEvent = this.percent;
                        break;
                    case "=":
                        this.clickEvent = this._equal;
                        break;
                }
                break;
        }

    }

    //numが数値として適切かどうか判定
    static checkNum(num) {
        return !(isNaN(Number(num)) || (num[0] === "0" && num.length >= 2 && num[1] !== "."));
    }

    //0~9
    pushNumber(e) {
        const app = this.app;
        if (this.app.state.complete) { this.clear(); }
        const currentNum = app.state.numberIsFixed ? "0" : app.state.currentNum;
        const pushedChar = this.value;
        const num = currentNum === "0" && pushedChar !== "." ? pushedChar : currentNum + pushedChar;
        if (!Button.checkNum(num)) { return; }
        app.setState({
            currentNum: num.toString(),
            numberIsFixed: false
        });
    }

    //.
    pushPoint() {
        const app = this.app;
        if (app.state.complete) { this.clear(); }
        const num = app.state.currentNum + ".";
        if (!Button.checkNum(num)) { return; }
        app.setState({
            currentNum: num,
            numberIsFixed: false
        });
    }

    //±
    plusMinus() {
        const app = this.app;
        const num = -1 * app.state.currentNum;
        if (app.state.complete) { this.clear(); }
        app.setState({
            currentNum: num.toString(),
            numberIsFixed: false
        });
    }

    //%
    percent() {
        const app = this.app;
        const num = 0.01 * app.state.currentNum;
        if (app.state.complete) { this.clear(); }
        app.setState({
            currentNum: num.toString(),
            numberIsFixed: false
        });
    }

    //+, -, ×, ÷
    operation(e) {
        const app = this.app;
        if (app.state.pushedButton === this) { return; }
        this._equal(e);
        const op = Button.opHash[e.currentTarget.dataset.value];
        app.setState({
            op: op
        });
    }

    //=
    _equal(e) {
        const app = this.app;
        let currentNum = app.state.currentNum;
        let right;
        if (app.state.complete) {
            if (e.currentTarget.dataset.value !== "=") {
                app.setState({
                    complete: false
                });
                return;
            }
            right = app.state.right
        } else {
            right = currentNum;
        }

        let complete;
        if (e.currentTarget.dataset.value === "=") {
            complete = true;
        } else {
            complete = false;
        }

        if (app.state.op) {
            //eval関数の使用による警告を無効化
            // eslint-disable-next-line
            eval(`currentNum = ${Number(app.state.left)} ${app.state.op} ${Number(right)}`);
        }

        app.setState({
            left: currentNum,
            right: right,
            currentNum: currentNum,
            numberIsFixed: true,
            complete: complete,
            classForScreen: "calculating"
        });

        setTimeout(() => {
            app.setState({ classForScreen: null });
        }, 130);
    }   

    //AC
    clear() {
        const state = {
            left: null,
            right: null,
            currentNum: "0",
            numberIsFixed: false,
            op: null,
            complete: false
        }

        this.app.setState(state);
    }

    commonClickEvent() {
        //ボタンを押すと一瞬黒くなる
        this.setState({ className: "pushed" });
        setTimeout(() => {
            this.setState({ className: null });
        }, 200);
        //

        this.app.setState({
            pushedButton: this
        });
    }

    render() {
        return (
            <button
                data-value={this.value}
                className={this.state.className}
                onClick={(e) => {
                    this.clickEvent(e);
                    this.commonClickEvent();
                }}
            >
                {this.value}
                <span></span>
                <span></span>
            </button>
        );
    }
}

export default Button;
