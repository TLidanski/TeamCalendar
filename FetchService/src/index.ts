import App from "./app";

import express from 'express';

import CalendarController from "./controllers/calendar.controller";

const app: App = new App({
    port: 4000,
    controllers: [new CalendarController()],
    middlewares: []
});

app.listen();