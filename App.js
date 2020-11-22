import React from "react";
import ReactDOM from "react-dom";
import Router from './components/Routes';

import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  rootElement
);
