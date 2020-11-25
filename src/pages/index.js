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
  let cryptoData;
  // const [cryptoData, setCryptoData] = useState(["Fruit", "Basketball"]);
  // const [stockData, setStockData] = useState({ hits: [] });
  useEffect(() => {
    async function fetchData() {
      // const stockResults = await api.stockAPI("1m");
      const cryptoResults = await api.cryptoAPI("1m");
      cryptoData = cryptoResults;
      // console.log("TELETABIS");
      // console.log(cryptoResults);
      // setCryptoData({"kek":"lmao"});
      // setCryptoData(["hello"])
      // console.log(cryptoData);

      // setCryptoData();
      // console.log(cryptoData);
    }
    fetchData();
  });
    
  
  return(
    <React.Fragment>
    
    <div className="root">

      <div className="bg-image">

        <Header />  

        <div className="graph">
          {/* <img className="graphImg" src={GraphImg} /> */}
          <Graph crypto={cryptoData}></Graph>
        </div>
        <div className="button-container">
          <Button>7 days</Button>
          <Button>1 month</Button>
          <Button>6 months</Button>
          <Button>1 year</Button>
        </div>
      </div>

      
    </div>
    </React.Fragment>
    
    );
  };
  
  