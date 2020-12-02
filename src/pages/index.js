import React, { useState, useEffect } from "react"
import Header from "./../components/Header"
import Button from "./../components/Button"
import Graph from "./../components/Graph"
import "./../css/reset.css";
import "./../css/home.css";
import Bg from "../images/map.png"
import GraphImg from "../images/graph.png"
import api from "./../logic/api.js";

export default function Home() {

  // api.stockAPI("1m");
  // api.cryptoAPI("1m");
  const [, updateState] = useState();
  const [timeFrame, setTimeFrame] = useState("1m")
  const changeTF = (e)=>{
    setTimeFrame(e.target.id);
    console.log(timeFrame)
  }

  return(
    <React.Fragment>
    
    <div className="root">

      <div className="bg-image">

        <Header />  

        <div className="graph">
          {/* <img className="graphImg" src={GraphImg} /> */}
          <Graph timeframe = {timeFrame}></Graph>
        </div>

      </div>

      
    </div>
    </React.Fragment>
    
    );
  };
  
  