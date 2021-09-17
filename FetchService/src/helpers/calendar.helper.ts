import ical from 'node-ical';
import { constants } from '../constants';

export default class CalendarHelper {
	private calendarUri = constants.calendarUri;
	constructor() {}

	public fetchEvents = async () => {
		return await ical.async.fromURL(this.calendarUri);
	}

	public getLeaves = (events: any): any[] => {
		let eventArr: any[] = [];
		const year = new Date().getFullYear().toString();

		const leaves = Object.keys(events).filter(key => {
			const timestamp = key.split('-')[0];
			return timestamp.includes(year);
		});

		for (const key of leaves) {
			const leave = events[key];
			if (leave.type === 'VEVENT') {
				eventArr.push(leave);
			}
		}

		return eventArr;
	}
}