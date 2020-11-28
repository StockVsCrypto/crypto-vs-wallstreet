
import React, { useState, useEffect } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryTheme } from 'victory';
import api from "./../logic/api.js";



export default function Graph(props) {
    const timeframe = props.timeframe;
    const [isLoading, setLoading] = useState(true);
    const [cryptoData, setCryptoData] = useState([]);
    const [stockData, setStockData] = useState([]);

    async function fetchData(fetchFunction, callbackFunction) { // Fetches from the API
        await fetchFunction(timeframe).then((response) =>{
            callbackFunction(response)
        });
    }

    useEffect(() => {
        setLoading(true);
        fetchData(api.cryptoAPI, setCryptoData);
        fetchData(api.stockAPI, setStockData);
        setLoading(false);
    }, []); // This empty array fixed the bug where useEffect() was constantly rerunning.
    if(isLoading){ // If we are still loading the data from API
        return(
            <div style={{width: "60vw", margin: "auto", fontSize:"150px"}}>
                Loading...
            </div>
        )
    }
 
    return(
        <React.Fragment>
            {/* {console.log(cryptoData)}
            {console.log(stockData)} */}
            <div style={{width: "60vw", margin: "auto"}}>
                <VictoryChart
                    width={1030}
                    height={600}
                    theme={VictoryTheme.material}
                >
                <VictoryLine
                    style={{
                    data: { stroke: "#FFC700" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={cryptoData}
                />
                <VictoryLine
                    style={{
                    data: { stroke: "#107C2E" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={stockData}
                />
                </VictoryChart>
            </div>     
        </React.Fragment>
    )
    
;}

  

