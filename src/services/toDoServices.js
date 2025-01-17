import axios from 'axios';
import { getUserDetails } from '../util/GetUser';

const SERVER_URL = 'http://localhost:5000/api/todo';

const authHeaders = () =>{
    let userToken = getUserDetails()?.token;
    return {headers: {'Authorization': userToken}}
}

const createToDo = (data) => {
    return axios.post(SERVER_URL + '/create-to-do', data, authHeaders());
}

const updateToDo = (id) => {
    return axios.post(SERVER_URL + '/update-to-do/'+id, authHeaders());
}


const getAllToDo = (userId) => {
    return axios.post(SERVER_URL + '/get-all-to-do/'+userId,  authHeaders());
}


const deleteToDo = (id) => {
    return axios.post(SERVER_URL + '/delete-to-do/'+id, authHeaders());
}


const ToDoServices = {
    createToDo,
    getAllToDo,
    deleteToDo,
    updateToDo,
}

export default ToDoServices;