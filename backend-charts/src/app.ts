const express = require("express");
const cors = require("cors");
import QueryManager from "./DbManager";
import {Request } from "express";

const queryManager = new QueryManager();

const app = express();

app.use(cors());

app.get("/pacientes", 
        async (req, res) => 
        {
            const result = await queryManager.pacientsPerCity();
            
            res.json({result});
        });

app.get("/atendimentos", 
        async (req, res) => 
        {
            const result = await queryManager.attendancePerCity();
            
            res.json({result});
        });

app.get("/proporcao", 
        async (req, res) => 
        {
            const result = await queryManager.ratioAttendacePerPatient();
            
            res.json({result});
        });

app.get("/desfechos", 
        async (req, res) => 
        {
            const result = await queryManager.outcomePerCity();
            
            res.json({result});
        });

// app.get("/desfechoscurados", 
//         async (req, res) => 
//         {
//             const result = await queryManager.curedOutcomePerCity();
            
//             res.json({result});
//         });

app.get("/covidcasos", 
        async (req: Request, res) => 
        {
            const result = await queryManager.covPositive();
            
            res.json({result});
        });

app.get("/pacientescovid/:cidade", 
        async (req: Request, res) => 
        {
            let c = req.params.cidade.replace('_', ' ');

            while( c.indexOf('_') >= 0 )
            {
                c = c.replace('_', ' ');
            }

            const result = await queryManager.covPositivePerMonth(c);
            
            res.json({result});
        });

// app.get("/pacientescovid/:cidade", 
//         async (req: Request, res) => 
//         {
//             let c = req.params.cidade.replace('_', ' ');

//             while( c.indexOf('_') >= 0 )
//             {
//                 c = c.replace('_', ' ');
//             }

//             const result = await queryManager.covPositivePerMonth(c);
            
//             res.json({result});
//         });

app.get("/mortespormes/:cidade", 
        async (req: Request, res) => 
        {
            let c = req.params.cidade.replace('_', ' ');

            while( c.indexOf('_') >= 0 )
            {
                c = c.replace('_', ' ');
            }

            const result = await queryManager.deathsPerMonth(c);
            
            res.json({result});
        });

app.get("/covidporidade/:cidade", 
        async (req: Request, res) => 
        {
            let c = req.params.cidade.replace('_', ' ');

            while( c.indexOf('_') >= 0 )
            {
                c = c.replace('_', ' ');
            }

            const result = await queryManager.covPositivePerAge(c);
            
            res.json({result});
        });

app.listen( 3001, 
            () => 
            {
                console.info("Server is running");
            })