import React from "react";
import ReactDOM from "react-dom";
import Router from './Routes';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  rootElement
);
