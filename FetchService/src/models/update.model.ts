import { MongoClient } from 'mongodb';
import { constants } from '../constants';

export default class UpdateModel {
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
		this.collection = this.db.collection('updates');
	}

	public close = () => {
		this.client.close();
	}

	public insertLastUpdateDate = async (date: Date) => {
		return await this.collection.insertOne({lastUpdate: date});
	}

    public getLastUpdate = async () => {
        const updateRecord = await this.collection.find({}).toArray();
        const lastUpdate = updateRecord.pop();

        return lastUpdate.lastUpdate;
    }
}