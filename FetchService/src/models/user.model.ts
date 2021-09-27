import { MongoClient } from 'mongodb';
import { constants } from '../constants';

export default class UserModel {
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
		this.collection = this.db.collection('users');
	}

	public close = () => {
		this.client.close();
	}

	public insertMultipleEvents = async (users: any[]) => {
		return await this.collection.insertMany(users);
	}

    public deleteAllRecords = async () => {
        return await this.collection.deleteMany({});
    }
}