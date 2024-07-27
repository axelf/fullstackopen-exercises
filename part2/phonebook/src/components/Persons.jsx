import PersonDetails from "./PersonDetails";

const Persons = ({ persons }) => {
	return (
		<ul>
			{persons.map((person) => {
				return <PersonDetails key={person.id} person={person} />;
			})}
		</ul>
	);
};

export default Persons;
