import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapWrapper from "./components/map-renderer";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      className="App"
    >
      <MapWrapper></MapWrapper>
    </div>
  );
}

export default App;
