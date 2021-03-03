import React, { useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./DeathsMonthLineChart.css";

const axios = require("axios");

const SelectCity = ({ city, setState }) => 
{
    const cities = 
    [
        'Anonimo',
        'Brasilia',
        'Sao Paulo'
    ];
    
    console.info( "city: " + city );

    return (
        <div className={"deathsmonth-selection-container"}>

            <h2>
                Obitos
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

const LineChart = ({ data }) => 
{   
    return (
        <div className={"deathsmonth-linechart-container"}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Mes',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Mortes',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>

    );

}

const DynamicLineChart = () =>
{
    const  [{ loading, data, err, city}, setState ] = useState({ loading: true, data: null, err: null, city:"sao paulo" });

    if(loading)
    {
        const url = `http://127.0.0.1:3001/mortespormes/${city.replaceAll(' ', '_')}`;
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
        <div className={"deathsmonth-linechart-root"}>

            <SelectCity
                city={city}
                setState={setState}/>

            <LineChart
                data={data}/>

        </div>  
    )
}

const DeathsMonthLineChart = () => 
{
    return (
        <div
            className="deathsmonth-pod">

            <DynamicLineChart/>        

        </div>
    )
}

export default DeathsMonthLineChart;