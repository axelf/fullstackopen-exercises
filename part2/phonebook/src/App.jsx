import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchterm, setSearchterm] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	}, []);

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
