import axios from './axios'

const WHITELIST_URL = '/users';
const COLLECTION = process.env.GATSBY_COLLECTION

export const getUser = (email) => {
    return axios.get(`${WHITELIST_URL}/${COLLECTION}/${email}`)
        .then((response) => {
            return response.data.response;
        }).catch(e => {
            // console.log(e);
            throw e;
        })
}

export const postUser = (urlEmail, email, roles) => {
    return axios.post(`${WHITELIST_URL}/${COLLECTION}/${urlEmail}`, { email, roles })
        .then((response) => {
            return response.data.response;
        }).catch(e => {
            console.log(e);
            throw e;
        })
}

export const deleteUser = (email) => {
    return axios.delete(`${WHITELIST_URL}/${COLLECTION}/${email}`)
        .then((response) => {
            return response.data.response;
        }).catch(e => {
            console.log(e);
            throw e;
        })
}

export default {
    getUser,
    postUser,
    deleteUser
}