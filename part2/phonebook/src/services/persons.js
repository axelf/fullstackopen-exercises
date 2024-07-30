import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
	return axios.get(baseURL);
};

const create = (newObject) => {
	const request = axios.post(baseURL, newObject);
	return request.then((response) => response.data);
};

const remove = (id) => {
	const request = axios.delete(`${baseURL}/${id}`);
	return request.then((response) => response.data);
};

const update = (person) => {
	const request = axios.put(`${baseURL}/${person.id}`, person);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	remove,
	update,
};
