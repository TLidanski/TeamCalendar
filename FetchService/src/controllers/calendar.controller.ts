import express, { Request, Response } from 'express';
import IController from '../interfaces/IController';

import CalendarHelper from '../helpers/calendar.helper';
import UserHelper from '../helpers/user.helper';

import CalendarModel from '../models/calendar.model';
import UserModel from '../models/user.model';

export default class CalendarController implements IController {
	path: string = '/calendar';
	router: express.Router = express.Router();
	private CalendarHelper: CalendarHelper = new CalendarHelper();
    private UserHelper: UserHelper = new UserHelper();

	constructor() {
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.get(this.path, this.fetchData);
	}

	private fetchData = async (req: Request, res: Response) => {
		const calendarModel: CalendarModel = new CalendarModel();
        const userModel: UserModel = new UserModel();
		const webEvents = await this.CalendarHelper.fetchEvents();
		const leaves = this.CalendarHelper.getLeaves(webEvents);

		await calendarModel.connect();
        await calendarModel.deleteAllRecords();
		await calendarModel.insertMultipleEvents(leaves);
		calendarModel.close();

        const users = this.UserHelper.extractUsersFromLeaves(leaves);
        await userModel.connect();
        await userModel.deleteAllRecords();
		await userModel.insertMultipleEvents(users);
        userModel.close();

		res.json(leaves)
	}
}