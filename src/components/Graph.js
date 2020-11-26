
import React, { useState } from "react"
import { VictoryChart, VictoryTooltip, VictoryLabel, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryVoronoiContainer } from 'victory';

export default function Graph(props) {    
    const data1 = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 9 },
        { x: 8, y: 11 },
        { x: 9, y: 8 },
        { x: 10, y: 9 },
        { x: 11, y: 12 },
        { x: 12, y: 11 },
        { x: 13, y: 9 },
        { x: 14, y: 14 },
        { x: 15, y: 16 },
        { x: 16, y: 13 },
        { x: 17, y: 15 },
        { x: 18, y: 10 },
        { x: 19, y: 19 },
        { x: 20, y: 17 },
        { x: 20, y: 17 },
        { x: 21, y: 21 },
        { x: 22, y: 22 },
        { x: 23, y: 20 },
        { x: 24, y: 25 },
        { x: 25, y: 18 },
        { x: 26, y: 25 },
        { x: 27, y: 26 },
        { x: 28, y: 23 },
        { x: 29, y: 24 },
        { x: 30, y: 30 },
    ];
    
    const data2 = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 5 },
        { x: 4, y: 3 },
        { x: 5, y: 4 },
        { x: 6, y: 7 },
        { x: 7, y: 8 },
        { x: 8, y: 12 },
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 11, y: 11 },
        { x: 12, y: 13 },
        { x: 13, y: 9 },
        { x: 14, y: 6 },
        { x: 15, y: 12 },
        { x: 16, y: 15 },
        { x: 17, y: 15 },
        { x: 18, y: 16 },
        { x: 19, y: 14 },
        { x: 20, y: 20 },
        { x: 20, y: 17 },
        { x: 21, y: 19 },
        { x: 22, y: 21 },
        { x: 23, y: 23 },
        { x: 24, y: 25 },
        { x: 25, y: 27 },
        { x: 26, y: 28 },
        { x: 27, y: 27 },
        { x: 28, y: 22 },
        { x: 29, y: 24 },
        { x: 30, y: 27 },
    ];
    
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
    
    return(
        <React.Fragment>
        {/* <div width="1030" height="600"> */}
        <VictoryChart theme={ chartStyles } style={{ parent: { maxWidth: "80%", margin:"auto" } }}
        width={1030} height={400}
        >
        <VictoryAxis label="Time (days)" style={{
              ...chartStyles,
              grid: {
                stroke: 'none',
              },
              axisLabel: { ...chartStyles.axisLabel, padding: 35 }
            }}
        />
        
        <VictoryAxis dependentAxis style={{
              ...chartStyles,
              grid: {
                stroke: 'none',
              },
              axisLabel: { ...chartStyles.axisLabel, padding: 35 }
            }}
            label="# of players"
        label="Volume growth (%)" 
        />
        
        <VictoryLine
        style={{ data: { stroke: "#107C2E", strokeWidth: 2 }}}
        animate={{ duration: 2000 }} data={ data1 }
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
        data={ data2 }
        />

        </VictoryChart>
        {/* </div> */}
        </React.Fragment>
        );
    }
    
    