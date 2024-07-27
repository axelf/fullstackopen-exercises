const Filter = ({ searchterm, onChange }) => {
	return (
		<div>
			filter shown with <input value={searchterm} onChange={onChange} />
		</div>
	);
};

export default Filter;
