// initialization and settings for express server

import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const app: Express = express();

app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//     //*Set static folder up in production
//     app.use(express.static('client/build'));

//     app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'front', 'build','index.html')));
//   }

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL!);
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if(req.method == "OPTIONS"){
        return res.sendStatus(200);
    }
    next();
})