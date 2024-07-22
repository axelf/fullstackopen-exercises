import { useState } from "react";

function App() {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];
	const anecdotes_number = anecdotes.length;
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes_number).fill(0));
	const [mostVoted, setMostVoted] = useState(0);

	const selectAnecdote = () => {
		const randomNumber = Math.floor(Math.random() * anecdotes_number);
		setSelected(randomNumber);
	};

	const addVote = () => {
		const newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);

		const maxVotes = Math.max(...newVotes);
		const mostVoted = newVotes.findIndex((value) => value === maxVotes);
		setMostVoted(mostVoted);
	};

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<p>
				{anecdotes[selected]} <br /> (has {votes[selected]} votes)
			</p>
			<button onClick={addVote}>vote</button>
			<button onClick={selectAnecdote}>next anecdote</button>
			<h2>Anecdote with most votes</h2>
			<p>
				{anecdotes[mostVoted]} <br /> (has {votes[mostVoted]} votes)
			</p>
		</div>
	);
}

export default App;
