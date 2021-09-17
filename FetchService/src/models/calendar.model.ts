import { MongoClient } from 'mongodb';
import { constants } from '../constants';

export default class CalendarModel {
	private db: any;
	private collection: any;
	private client: MongoClient;
	private dbName: string = 'TeamCalendar';
	private url: string = constants.dbUrl;

	constructor() {
		this.client = new MongoClient(this.url);
	}

	public connect = async () => {
		await this.client.connect();
		this.db = this.client.db(this.dbName);
		this.collection = this.db.collection('events');
	}

	public close = () => {
		this.client.close();
	}

	public insertMultipleEvents = async (events: any[]) => {
		return await this.collection.insertMany(events);
	}
}