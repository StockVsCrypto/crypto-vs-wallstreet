import React from "react"
import Header from "./../components/Header"
import Button from "./../components/Button"
import "./../css/reset.css";
import "./../css/home.css";
import Bg from "../images/map.png"
import GraphImg from "../images/graph.png"

export default function Home() {
  return(
    <React.Fragment>
    
    <div className="root">

      <div className="bg-image">

        <Header />  

        <div className="graph">
          <img className="graphImg" src={GraphImg} />
          <div className="button-container">
            <Button />
            <Button />
            <Button />
            <Button />
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
    
    );
  }
  
  