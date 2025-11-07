import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAllFromCharacters = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
};

const createNewFromCharacters = newAddition => {
    const request = axios.post(baseUrl, newAddition);
    return request.then(response => response.data)
};

const deleteFromCharacters = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
}

const updateFromCharacters = (id, newData) => {
    const request = axios.put(`${baseUrl}/${id}`, newData)
    return request.then(response => response.data);
}

export { getAllFromCharacters, createNewFromCharacters, deleteFromCharacters, updateFromCharacters };