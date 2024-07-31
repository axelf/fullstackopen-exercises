import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchterm, setSearchterm] = useState("");
	const [message, setMessage] = useState(null);
	const [messageType, setMessageType] = useState(null);

	useEffect(() => {
		personService.getAll().then((response) => {
			setPersons(response.data);
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const personAlreadyExists = persons.find((person) => {
			return person.name === newName;
		});

		if (personAlreadyExists) {
			const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
			if (window.confirm(message)) {
				const changedPerson = { ...personAlreadyExists, number: newNumber };
				personService
					.update(changedPerson.id, changedPerson)
					.then((person) => {
						setPersons(persons.map((p) => (p.id !== person.id ? p : person)));
						setNewName("");
						setNewNumber("");
					})
					.catch(() => {
						setMessage(
							`Information of ${changedPerson.name} has already been removed from server`
						);
						setMessageType("error");
					});
			}

			return;
		}

		const personObj = {
			name: newName,
			number: newNumber,
		};

		personService.create(personObj).then((newPerson) => {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewNumber("");
			setMessage(`Added ${newPerson.name}`);
			setMessageType("success");

			window.setTimeout(() => {
				setMessage(null);
				setMessageType(null);
			}, 5000);
		});
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

	const deletePerson = (id) => {
		personService
			.remove(id)
			.then((deletedPerson) => {
				const personList = persons.filter((person) => {
					return person.id !== deletedPerson.id;
				});

				setPersons(personList);
			})
			.catch(() => {
				console.log("Entry not found");
			});
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} type={messageType} />

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
			<Persons persons={persons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
