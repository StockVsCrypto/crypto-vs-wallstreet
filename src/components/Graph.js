
import React, { useState } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryTheme } from 'victory';

export default function Graph(props) {
    console.log(props)


    return(
    <React.Fragment>
        
        <div style={{width: "60vw", margin: "auto"}}>
            <VictoryChart
                width={1030}
                height={600}
                theme={VictoryTheme.material}
            >
            <VictoryLine
                
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                // data={props.children}
            />
            </VictoryChart>
        </div>

            
        </React.Fragment>
);}

  

