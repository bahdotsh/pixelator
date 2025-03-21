import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pixelator from "./components/Pixelator";
import "./styles/globals.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Pixelator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
