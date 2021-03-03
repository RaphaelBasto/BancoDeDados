import React from 'react';
import PacientPieChart from "./charts/PacientPieChart";
import AttendancePieChart from "./charts/AttendancePieChart";
import RatioBarChart from './charts/RatioBarChart';
import OutcomeBarChart from './charts/OutcomeBarChart';
import "./App.css";
import CovidCasesBarChart from './charts/CovidCasesBarChart';
import CovidPositiveLineChart from './charts/CovidPositiveLineChart';
import DeathsMonthLineChart from './charts/DeathsMonthLineChart';
import CovidPerAgeBarChart from './charts/CovidPerAgeBarChart';


function App() {
  return (
    <div 
      className={"root-container"}>

      <div 
        className="page-header">
          <h2
            className="page-text">
            Analise dos dados HSL
          </h2>
      </div>

      <div 
        className={"flex-row-container"}>
        
          <PacientPieChart/>

          <AttendancePieChart/>

          <RatioBarChart />

      </div>

      <div 
        className={"flex-row-container"}>
        
        <OutcomeBarChart/>

        <CovidCasesBarChart/>

      </div>

      <div 
        className={"flex-row-container"}>

        <CovidPositiveLineChart/>
        
        <DeathsMonthLineChart/>
          
      </div>

      <div
        className={"flex-row-container"}>

        <CovidPerAgeBarChart/>

      </div>

    </div>
  );
}

export default App;
