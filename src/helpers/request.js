import axios from "axios";
import {endPoints} from '../config/api';
import {checkAuthUser} from './auth'


//this will not work directly after login, because on init script user is null
//axios.defaults.headers.put = headers;
//axios.defaults.headers.get = headers;
//axios.defaults.headers.post = headers;//can't be set to default because of different endpoint allow/restrict this
//axios.defaults.headers.delete = headers;
const axiosInstance = axios.create();

const setAuthHeaders = (withCredentials) => {

    let headers = {};
    if (withCredentials) {
        const user = checkAuthUser();
        if (user) {
            headers.Authorization = `Bearer ${user.accessToken}`;
        }
    }
    return headers;
};
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        throw JSON.stringify({status: 401});
    }
    throw error;
});

const getData = (url, payload, withCredentials = true) => {
    return axiosInstance({
        method: 'GET',
        url: url,
        headers: {
            ...setAuthHeaders(withCredentials)
        }
    });
};

const postData = (url, payload, withCredentials = false) => {
    return axiosInstance({
        method: 'POST',
        url: url,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            ...setAuthHeaders(withCredentials)
        }
    })
};
const patchData = (url, payload, withCredentials = false) => {
    return axiosInstance({
        method: 'PATCH',
        url: url,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            ...setAuthHeaders(withCredentials)
        }
    })
};
const putData = (url, payload, withCredentials = true) => {
    return axiosInstance({
        method: 'PUT',
        url: url,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            ...setAuthHeaders(withCredentials)
        }
    })
};

const deleteData = (url, withCredentials = true) => {
    return axiosInstance({
        method: 'DELETE',
        url: url,
        headers: {
            ...setAuthHeaders(withCredentials)
        }
    })
};

export {
    getData,
    postData,
    putData,
    deleteData,
    patchData,
    endPoints
}