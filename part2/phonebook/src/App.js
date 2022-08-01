import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Alert from "./Alert";
import {
  deletePerson,
  getAll,
  postPerson,
  putPerson,
} from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    getAll().then((persons) => setPersons(persons));
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

  const handleMessage = ({ message, type }) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const maybeDuplicate = persons.find((p) => p.name === newName);

    // If there's a duplicate, confirm with user then POST person
    if (maybeDuplicate) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace old number with a new one?`
        )
      ) {
        putPerson({ ...maybeDuplicate, number: newNumber })
          .then((modifiedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== modifiedPerson.id ? p : modifiedPerson
              )
            );
            return modifiedPerson;
          })
          .then((modifiedPerson) =>
            handleMessage({
              message: `Updated ${modifiedPerson.name}`,
              type: "success",
            })
          );
      }
      // If no duplicate, PUT new person
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      postPerson(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          return createdPerson;
        })
        .then((createdPerson) =>
          handleMessage({
            message: `Added ${createdPerson.name}`,
            type: "success",
          })
        )
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = ({ name, id }) => {
    if (window.confirm(`delete ${name}`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() =>
          handleMessage({
            message: `Information of ${name} has already been removed from server.`,
            type: "danger",
          })
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert message={message} type={messageType} />
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
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
