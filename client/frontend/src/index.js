import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";


const mountNode = document.createElement('div');
mountNode.id = 'app';
document.body.appendChild(mountNode);
ReactDOM.render(<App name="Jane" />, mountNode);