
import React, { useState } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryTheme } from 'victory';

export default function Graph() {


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
                data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
                { x: 5, y: 7 },
                { x: 5, y: 7 },
                { x: 5, y: 7 },
                { x: 6, y: 7 },
                { x: 7, y: 7 }
                ]}
            />
            </VictoryChart>
        </div>

            
        </React.Fragment>
);}

  

