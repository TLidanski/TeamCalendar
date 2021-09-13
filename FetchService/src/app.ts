import express, { Application } from 'express';
import * as server from 'http';

import IController from './interfaces/IController';

export default class App {
	private app: Application;
	private port: number;
	private server: server.Server;

	constructor(constructorObj: {port: number, controllers: IController[], middlewares: any[]}) {
		const { port, controllers, middlewares } = constructorObj;

		this.app = express();
		this.port = port;
		this.server = server.createServer(this.app);

		this.setUpMiddleWares(middlewares);
		this.setUpRoutes(controllers);
	}

	private setUpRoutes = (controllers: IController[]) => {
		for (const controller of controllers) {
			this.app.use('/', controller.router);
		}
	}

	private setUpMiddleWares = (middlewares: any[]) => {
		for (const middleware of middlewares) {
			this.app.use(middleware);
		}
	}

	public listen = () => {
		this.server.listen(this.port, () => console.log(`Server running on port ${this.port}`));
	}
}