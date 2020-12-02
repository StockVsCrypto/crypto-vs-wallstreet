import React, { useState, useEffect } from "react"
import Header from "./../components/Header"
import Footer from "./../components/Footer"
import Graph from "./../components/Graph"
import "./../css/reset.css";
import "./../css/home.css";
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
        <div className="content">
          <Header />  
          <main className="graph">
            <Graph timeframe = {timeFrame}></Graph>
          </main>
        </div>
        <Footer /> 
      </div>
    </div>

    </React.Fragment>
    
    );
  };
  
  