import App from "./app";

import express from 'express';
import cors from 'cors';

import CalendarController from "./controllers/calendar.controller";

const app: App = new App({
    port: 4000,
    controllers: [new CalendarController()],
    middlewares: [
        cors({
            origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.1.93:3000'],
            // credentials: true
        }),
        express.json()
    ]
});

app.listen();