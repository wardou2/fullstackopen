import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(({ data }) => data);
};

const postPerson = (person) => {
  const req = axios.post(baseUrl, person);
  return req.then(({ data }) => data);
};

const putPerson = (person) => {
  const req = axios.put(`${baseUrl}/${person.id}`, person);
  return req.then(({ data }) => data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then(({ data }) => data);
};
export { getAll, postPerson, putPerson, deletePerson };
