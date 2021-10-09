import { useState } from 'react';

import DatePicker from 'react-datepicker';
import UserLeave from '../components/UserLeave';

import 'react-datepicker/dist/react-datepicker.css';

const Leaves = () => {
	const [leaves, setLeaves] = useState([]); 
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const postData = async () => {
		const response = await fetch('http://localhost:4000/calendar', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({startDate, endDate})
		});

		setLeaves(await response.json());
	}

	return (
		<>
			<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
			<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
			<button onClick={postData}>Get Leaves</button>

			{leaves.map(event => <UserLeave event={event} />)}
		</>
	);
}

export default Leaves;