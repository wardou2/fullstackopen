import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(({ data }) => setPersons(data));
    }, []);

    const personsToShow = persons.filter((person) => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
    });

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const hasDuplicate = () => {
        const index = persons.findIndex((person) => person.name === newName);
        return index >= 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (hasDuplicate()) {
            alert(newName + " is already added to the phonebook.");
            return;
        }
        setPersons(
            persons.concat({
                name: newName,
                number: newNumber,
                id: persons.length + 1,
            })
        );
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
