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

	public upsertEvents = async (events: any, lastUpdate: Date) => {
		const year = new Date().getFullYear().toString();
		const leaves = Object.keys(events).filter(key => {
			const timestamp = key.split('-')[0];
			const isRecentlyModified = new Date(events[key].lastmodified) > lastUpdate;
			const isUserEvent = events[key].type === 'VEVENT';

			return timestamp.includes(year) && isRecentlyModified && isUserEvent;
		});

		const bulkWriteOps = leaves.map(key => {
			const event = events[key];
			return {
				updateOne: {
					filter: {'event-id': event['event-id']},
					update: {
						$set: {
							...event,
							start: event.start.toLocaleDateString(),
							end: event.end.toLocaleDateString()
						}
					},
					upsert: true
				}
			};
		});

		return await this.collection.bulkWrite(bulkWriteOps);
	}

    public fetchLeavesBetweenDates = async (start: any, end: any) => {
        return await this.collection.find({
            end: {$gte: new Date(start), $lte: new Date(end)}
        }).toArray();
    }

    public deleteAllRecords = async () => {
        return await this.collection.deleteMany({});
    }
}