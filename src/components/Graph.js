
import React, { useState, useEffect } from "react"
import { VictoryChart, VictoryTooltip, VictoryLabel, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryVoronoiContainer } from 'victory';
import api from "./../logic/api.js";

export default function Graph(props) {
    
    const chartStyles = {
        axis: {
            style: {
                tickLabels: {
                    fill: 'white',
                    fontSize: '14px',
                    fontFamily: 'Rajdhani',
                    padding: 10,
                },
                axis: { 
                    stroke: '#015A72', 
                },
                axisLabel: {
                    fill: 'white',
                    fontSize: '14px',
                    fontFamily: 'Rajdhani',
                    textAnchor: 'bottom'
                },
            },
        },
    }

    const timeframe = props.timeframe;
    const [isLoading, setLoading] = useState(true);
    const [cryptoData, setCryptoData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [overtake, setOvertake] = useState(); // The date that crypto overtakes stocks
    const [remount, setRemount] = useState(0); // Used for running useEffect again.

    async function fetchData(fetchFunction, callbackFunction) { // Fetches from the API
        const res = await fetchFunction(timeframe).then((response) =>{
            callbackFunction(response)
            return response;
        });
        return res
    }
    useEffect(() => {
        setLoading(true);
            fetchData(api.cryptoAPI, setCryptoData).then((cryptoRes)=>{
                fetchData(api.stockAPI, setStockData).then((stockRes)=>{
                    const date = api.calculateOvertake(stockRes, cryptoRes)
                    setOvertake(date)
                    console.log("Overtake date: "+date)
                })
        });
        setLoading(false);
    }, [remount]); // When the variable(s) in this array are changed, useEffect will be running again
    if(isLoading){ // If we are still loading the data from API
        return(
            <div style={{width: "60vw", margin: "auto", fontSize:"150px"}}>
                Loading...
            </div>
        )
    }
    
    return(
        <React.Fragment>
        {/* <div width="1030" height="600"> */}
        <VictoryChart theme={ chartStyles } style={{ parent: { maxWidth: "80%", margin:"auto" } }}
        width={1030} height={400}
        >
        <VictoryAxis label="Date" style={{
              ...chartStyles,
              grid: {
                stroke: 'none',
              },
              axisLabel: { ...chartStyles.axisLabel, padding: 35 }
            }
            
        }
        tickCount="10"
        />
        
        <VictoryAxis dependentAxis style={{
              ...chartStyles,
              grid: {
                stroke: 'none',
              },
              axisLabel: { ...chartStyles.axisLabel, padding: 35 }
            }}
        label="Market growth (%)" 
        />
        
        <VictoryLine
        style={{ data: { stroke: "#107C2E", strokeWidth: 2 }}}
        animate={{ duration: 2000 }} data={stockData}
        labels={() => "HELLO"}
        labelComponent={
            <VictoryTooltip dy={0} centerOffset={{ x: 25 }} />
        }
        // labels={() => ["This is a", "multi-line", "label"]}
        // labelComponent={
        //     <VictoryLabel
        //     backgroundStyle={{ fill: "pink" }}
        //     backgroundPadding={3}
        //     textAnchor="start"
        //     verticalAnchor="middle"
        //     />
        // }
        />
        
        
        <VictoryLine
        style={{ data: { stroke: "#FFC700",  strokeWidth: 2}}}
        animate={{ duration: 2000 }}
        data={cryptoData}
        />

        </VictoryChart>
        {/* </div> */}
        </React.Fragment>
        );
    }
    
    