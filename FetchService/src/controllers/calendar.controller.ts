import express, { Request, Response } from 'express';
import IController from '../interfaces/IController';
import CalendarHelper from '../helpers/calendar.helper';

export default class CalendarController implements IController {
	path: string = '/calendar';
	router: express.Router = express.Router();
	private CalendarHelper: CalendarHelper = new CalendarHelper();

	constructor() {
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.get(this.path, this.fetchData);
	}

	private fetchData = async (req: Request, res: Response) => {
		const webEvents = await this.CalendarHelper.fetchEvents();
		console.log(webEvents);

		res.json(webEvents)
	}
}