import React from "react";
import ReactDOM from "react-dom";
import EventStream from "./containers/event-stream/event-stream";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <EventStream />
  </React.StrictMode>,
  document.getElementById("root")
);
