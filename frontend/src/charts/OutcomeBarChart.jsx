import React, { useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import "./OutcomeBarChart.css"

const axios = require("axios");

const BarChart = () => 
{   
    const  [{ loading, data, err}, setState ] = useState({ loading: true, data: null, err: null});

    if(loading)
    {
        axios.get("http://127.0.0.1:3001/desfechos")
        .then(
            res=>
            {    
                let {result} = res.data;

                // console.info(result);

                setState({ data: result, loading: false, err: null });
            }
        )
        .catch( 
            err =>
            {
                setState({ data: null, loading: false, err });
            });

        return (
            <CircularProgress/>
        )
    }
    else if(err)
    {
        return (
            <Alert severity="error">
                {
                    JSON.stringify(err)
                }
            </Alert>
        )
    }

    return (
            <ResponsiveBar
                data={data}
                keys={['obito', 'transferencia', 'desistencia', 'assistencia_domiciliar']}
                indexBy="municipio"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'set3' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'obito'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Municipio',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Casos',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        )
}

const OutcomeBarChart = () => 
{
    return (
        <div 
            className="outcome-barchart-root">

            <div 
                className="outcome-barchart-header">
                <h2
                    className="outcome-barchart-text">
                    Desfechos (sem alta) 
                </h2>
            </div>
            
            <div 
                className="outcome-barchart-container">
                <BarChart/>
            </div>
        
        </div>
    )
}

export default OutcomeBarChart;