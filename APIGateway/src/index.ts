import express, {Application, Request, Response} from 'express';
import http from 'http';

const app: Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`API Gateway listening on port ${port}`));