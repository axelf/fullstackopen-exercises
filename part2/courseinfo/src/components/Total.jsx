function Total({ parts }) {
	const sum = parts.reduce((s, part) => (s += part.exercises), 0);
	return (
		<p>
			<strong>total of {sum} exercises</strong>
		</p>
	);
}

export default Total;
