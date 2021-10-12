import { useState } from 'react';
import { getJson } from '../helpers/fetch';

import DatePicker from 'react-datepicker';
import UserLeave from '../components/UserLeave';

import 'react-datepicker/dist/react-datepicker.css';

const Leaves = () => {
	const [leaves, setLeaves] = useState([]); 
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const getLeaves = async () => {
        const params = {startDate: startDate.toISOString(), endDate: endDate.toISOString()};
		const leaveEvents = await getJson('http://localhost:4000/calendar/leaves', params);
		setLeaves(leaveEvents);
	}

	return (
		<>
			<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
			<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
			<button onClick={getLeaves}>Get Leaves</button>

			{leaves.map(event => <UserLeave event={event} />)}
		</>
	);
}

export default Leaves;