import ical from 'node-ical';

export default class CalendarHelper {
	private calendarUri = 'https://wiki.isobarsystems.com/rest/calendar-services/1.0/calendar/export/subcalendar/private/81cc1b5d3a3d555286761d02daa53df15cf6cf66.ics';
	constructor() {}

	public fetchEvents = async () => {
		return await ical.async.fromURL(this.calendarUri);
	}
}