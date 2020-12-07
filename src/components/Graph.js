
import React, { useState, useEffect } from "react"
import {useRef} from 'react';
import Button from "./../components/Button"
import "./../css/home.css";

import { VictoryChart, VictoryLine, VictoryAxis} from 'victory';
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
                    textShadow: '2px 4px 10px black',
                },
                axis: { 
                    stroke: '#015A72', 
                },
                axisLabel: {
                    fill: 'white',
                    fontSize: '14px',
                    fontFamily: 'Rajdhani',
                    // textAnchor: 'bottom',
                    textShadow: '2px 4px 10px black',
                },
            },
        },
    }
    const [timeframe, setTimeframe] = useState(props.timeframe);
    const [selectedButton, setSelectedButton] = useState("1");
    const [isLoading, setLoading] = useState(true);
    const [cryptoData, setCryptoData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [overtake, setOvertake] = useState(); // The date that crypto overtakes stocks

    let btnContainerRef = useRef();

    const changeTF = (e)=>{
        if(!isLoading) {

            // setLoading(true);
            if(timeframe != e.target.id) { // If the button is not the "already selected button"
                btnContainerRef.current.style.pointerEvents = "none";

                setTimeframe(e.target.id)
            }
        }
        // setRemount(remount+1)
    }
    async function fetchData(fetchFunction) { // Fetches from the API
        const res = await fetchFunction(timeframe).then((response) =>{
            setStockData(response.stockData)
            setCryptoData(response.cryptoData)
            return response;
        });
        return res
    }
    useEffect(() => {
        setLoading(true);
        fetchData(api.callAPI).then((res)=>{
            const date = api.calculateOvertake(res.stockData, res.cryptoData)
            setOvertake(date)
            console.log("Overtake date: "+date)
        })
        if(btnContainerRef.current !=null){
            btnContainerRef.current.style.pointerEvents = "auto";

        }
        setLoading(false);
    }, [timeframe]); // When the variable(s) in this array are changed, useEffect will be running again
    if(isLoading){ // If we are still loading the data from API
        return(
            <div style={{width: "60vw", margin: "auto", fontSize:"150px"}}>
                Loading...
            </div>
        )
    }
    
    return(
        <React.Fragment>
        <div className="dueDate">
        <p className="dueDateText">Due date <span className="crypto">crypto</span> market overtake <span className="wallstreet">Wallstreet:</span></p>
        <p className="dueDateDate">{overtake ? overtake: "NONE"}</p>
        </div>

        <VictoryChart theme={ chartStyles } style={{ parent: { maxWidth: "100%", margin:"auto" } }}
        width={1030} height={400}
        // containerComponent={
        //     <VictoryVoronoiContainer
        //       voronoiDimension="x"
        //       labels={() => `Wallstreet`}
        //       labelComponent={
        //         <VictoryTooltip
        //           style={{fill: "white", fontSize: "14", fontFamily: "Rajdhani", textShadow: "2px 4px 10px black" }}
        //         />}
        //     />}
        >
        <VictoryAxis label="Date" style={{
              ...chartStyles,
              grid: {
                stroke: 'none',
              },
              axisLabel: { ...chartStyles.axisLabel, padding: 35 }
            }
            
        }
        tickCount={10}
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

        {/* <VictoryLabel
            text={`Due date crypto`}
            x={850}
            y={10}
            // textAnchor="middle"
            style={{fill: "white", fontSize: "16", fontFamily: "Rajdhani", textShadow: "2px 4px 10px black" }}
          />

        <VictoryLabel
            text={`overtake Wallstreet`}
            x={850}
            y={28}
            // textAnchor="middle"
            style={{fill: "white", fontSize: "16", fontFamily: "Rajdhani", textShadow: "2px 4px 10px black" }}
          />
        
          <VictoryLabel
            text={`
            2022-10-20`}
            x={850}
            y={50}
            // textAnchor="middle"
            style={{ fill: "red", fontSize: "30", fontFamily: "Rajdhani", fontWeight: "bold", textShadow: "2px 4px 10px black" }}
          /> */}
        
        <VictoryLine
        style={{ data: { stroke: "#107C2E", strokeWidth: 2 }}}
        animate={{ duration: 2000 }} data={stockData}
        />
        
        
        <VictoryLine
        style={{ data: { stroke: "#FFC700",  strokeWidth: 2}}}
        animate={{ duration: 2000 }}
        data={cryptoData}
        />

        </VictoryChart>
        <div className="button-container" ref={btnContainerRef}>
          <Button clickFunc={changeTF} id="7d" selected={timeframe}>7 days</Button>
          <Button clickFunc={changeTF} id="1m" selected={timeframe}>1 month</Button>
          <Button clickFunc={changeTF} id="6m" selected={timeframe}>6 months</Button>
          <Button clickFunc={changeTF} id="1y" selected={timeframe}>1 year</Button>
        </div>
        {/* </div> */}
        </React.Fragment>
        );
    }
    
    