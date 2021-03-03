import React, { useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./CovidPerAgeBarChart.css";

const axios = require("axios");

const SelectCity = ({ city, setState }) => 
{
    const cities = 
    [
        'Anonimo',
        'Brasilia',
        'Campos Do Jordao',
        'Diadema',
        'Guarulhos',
        'Osasco',
        'Sao Paulo'
    ];
    
    return (
        <div className={"covidage-selection-container"}>

            <h2>
                Casos por ano de nascimento
            </h2>

            <FormControl variant="outlined">

                <InputLabel id="demo-simple-select-outlined-label">
                    Municipio
                </InputLabel>

                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={city}
                    onChange={( v )=>{
                        const c = v.target.value;
                        console.info( "next city: ", c);
                        setState({
                            loading: true, 
                            city: c, 
                            data: null, 
                            err: null
                        })
                    }}
                    label="Municipio"
                    >
                        {
                            cities.map( v => {
                                return (
                                    <MenuItem
                                        key={v.toLocaleLowerCase()} 
                                        value={v.toLowerCase()}>
                                        {
                                            v
                                        }
                                    </MenuItem>
                                )
                            })
                        }
                </Select>
        </FormControl>

      </div>
    )

}
const BarChart = ({ data }) => 
{   
    return (
        <div className={"covidage-barchart-container"}>

            <ResponsiveBar
                data={data}
                keys={[ 'value' ]}
                indexBy="idade"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
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
                            id: 'value'
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
                    legend: 'Faixa de nascimento',
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

        </div>

    );

}

const DynamicBarChart = () =>
{
    const  [{ loading, data, err, city}, setState ] = useState({ loading: true, data: null, err: null, city: "sao paulo" });

    if(loading)
    {
        const url = `http://127.0.0.1:3001/covidporidade/${city.replaceAll(' ', '_')}`;
        console.info("url: ", url);
        axios.get(url)
        .then(
           res=>
           {    
               let {result} = res.data;

               console.info("data: ", result);

               setState({ data: result, loading: false, err: null, city });
           }
         )
        .catch( 
            err =>
            {
               setState({ data: null, loading: false, err, city });
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
        <div className={"covidage-barchart-root"}>

            <SelectCity
                city={city}
                setState={setState}/>

            <BarChart
                data={data}/>

        </div>  
    )
}

const CovidPerAgeBarChart = () => 
{
    return (
        <div
            className="covidage-pod">

            <DynamicBarChart/>        

        </div>
    )
}

export default CovidPerAgeBarChart;