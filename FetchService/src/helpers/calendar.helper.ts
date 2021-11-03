import ical from 'node-ical';
import { constants } from '../constants';

export default class CalendarHelper {
	private calendarUri = constants.calendarUri;
	constructor() {}

	public fetchEvents = async () => {
		return await ical.async.fromURL(this.calendarUri);
	}
}