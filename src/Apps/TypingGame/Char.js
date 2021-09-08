import React from "react";
import "./style/Char.css";

function Char(props) {
    return (
        <li className={props.className} style={props.style}>
            {props.char}
            <span></span>
        </li>
    );
}

export default Char;
