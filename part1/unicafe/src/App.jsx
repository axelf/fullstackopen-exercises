import { useState } from "react";
const Statistics = (props) => {
	const { good, neutral, bad, all, average, positive } = props;

	if (all === 0) {
		return <p>No feedback given</p>;
	}

	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="all" value={all} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={positive} />
			</tbody>
		</table>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</>
	);
};

const Button = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [all, setAll] = useState(0);
	const [average, setAverage] = useState(0);
	const [positivePercent, setPositivePercent] = useState(0);

	const addGoodFeedback = () => {
		const updatedGood = good + 1;
		const updatedAll = all + 1;

		setGood(updatedGood);
		setAll(updatedAll);
		setAverage((updatedGood * 1 + bad * -1) / updatedAll);
		setPositivePercent((updatedGood / updatedAll) * 100);
		//console.log(updatedGood, bad, neutral, all);
	};

	const addNeutralFeedback = () => {
		const updatedAll = all + 1;
		setNeutral(neutral + 1);
		setAll(updatedAll);
		setPositivePercent((good / updatedAll) * 100);
	};

	const addBadFeedback = () => {
		const updatedBad = bad + 1;
		const updatedAll = all + 1;

		setBad(updatedBad);
		setAll(updatedAll);
		setAverage((good * 1 + updatedBad * -1) / updatedAll);
		setPositivePercent((good / updatedAll) * 100);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<p>
				<Button onClick={addGoodFeedback} text="good" />
				<Button onClick={addNeutralFeedback} text="neutral" />
				<Button onClick={addBadFeedback} text="bad" />
			</p>
			<h2>statistics</h2>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positivePercent}
			/>
		</div>
	);
};

export default App;
