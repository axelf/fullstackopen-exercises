import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchterm, setSearchterm] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const personAlreadyExists = persons.find((person) => {
			return person.name === newName;
		});

		if (personAlreadyExists) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const personObj = {
			name: newName,
			id: persons.length + 1,
		};

		setPersons(persons.concat(personObj));
		setNewName("");
	};

	const handleChangeName = (e) => setNewName(e.target.value);
	const handleChangeNumber = (e) => setNewNumber(e.target.value);

	const handleFilter = (e) => {
		const value = e.target.value;
		setSearchterm(value);

		const found = persons.filter((person) => {
			const regExp = new RegExp(value, "i");
			return person.name.match(regExp);
		});

		setPersons(found);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchterm={searchterm} onChange={handleFilter} />

			<h2>Add a new</h2>
			<PersonForm
				name={newName}
				number={newNumber}
				onChangeName={handleChangeName}
				onChangeNumber={handleChangeNumber}
				onSubmit={handleSubmit}
			/>

			<h2>Numbers</h2>
			<Persons persons={persons} />
		</div>
	);
};

export default App;
