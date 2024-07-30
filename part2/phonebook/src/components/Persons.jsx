import PersonDetails from "./PersonDetails";

const Persons = ({ persons, deletePerson }) => {
	return (
		<ul>
			{persons.map((person) => {
				return (
					<PersonDetails key={person.id} person={person} deletePerson={deletePerson} />
				);
			})}
		</ul>
	);
};

export default Persons;
