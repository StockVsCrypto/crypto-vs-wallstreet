import React from "react"
import Header from "./../components/Header"
import Button from "./../components/Button"
import Graph from "./../components/Graph"
import "./../css/reset.css";
import "./../css/home.css";
import Bg from "../images/map.png"
import GraphImg from "../images/graph.png"
import api from "./../logic/api.js";

export default function Home() {
  let stockData = api.cryptoAPI("1m")
  return(
    <React.Fragment>
    
    <div className="root">

      <div className="bg-image">

        <Header />  

        <div className="graph">
          {/* <img className="graphImg" src={GraphImg} /> */}
          <Graph/>
        </div>
        <div className="button-container">
          <Button />
          <Button />
          <Button />
          <Button />
        </div>
      </div>

      
    </div>
    </React.Fragment>
    
    );
  };
  
  