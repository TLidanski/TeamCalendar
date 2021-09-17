import express, { Request, Response } from 'express';
import IController from '../interfaces/IController';

import CalendarHelper from '../helpers/calendar.helper';

import CalendarModel from '../models/calendar.model';

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
		const calendarModel: CalendarModel = new CalendarModel();
		const webEvents = await this.CalendarHelper.fetchEvents();
		const leaves = this.CalendarHelper.getLeaves(webEvents);

		await calendarModel.connect();
		await calendarModel.insertMultipleEvents(leaves);

		calendarModel.close();
		res.json(leaves)
	}
}