import express, { Request, Response } from 'express';
import IController from '../interfaces/IController';

import CalendarHelper from '../helpers/calendar.helper';

import CalendarModel from '../models/calendar.model';
import UpdateModel from '../models/update.model';

export default class CalendarController implements IController {
	path: string = '/calendar';
	router: express.Router = express.Router();
	private CalendarHelper: CalendarHelper = new CalendarHelper();

	constructor() {
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.get(this.path, this.fetchData);
		this.router.get(`${this.path}/leaves`, this.getLeaves);
	}

	private fetchData = async (req: Request, res: Response) => {
		const calendarModel: CalendarModel = new CalendarModel();
		const updateModel : UpdateModel = new UpdateModel();

		await updateModel.connect();
		const webEvents = await this.CalendarHelper.fetchEvents();
		const lastUpdateDate = await updateModel.getLastUpdate();

		await calendarModel.connect();
		const result = await calendarModel.upsertEvents(webEvents, lastUpdateDate);
		calendarModel.close();

		await updateModel.insertLastUpdateDate(new Date());
		updateModel.close();

		res.json(result)
	}

	private getLeaves = async (req: Request, res: Response) => {
		const {startDate, endDate} = req.query;
		const calendarModel: CalendarModel = new CalendarModel();

		await calendarModel.connect();
		const leaves = await calendarModel.fetchLeavesBetweenDates(startDate, endDate);
		calendarModel.close();

		res.json(leaves);
    }
}