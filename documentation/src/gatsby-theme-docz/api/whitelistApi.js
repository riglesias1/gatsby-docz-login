import axios from './axios'

const WHITELIST_URL = '/whitelist';
const COLLECTION = process.env.GATSBY_COLLECTION

export const getWhitelist = () => {
    return axios.get(`${WHITELIST_URL}/${COLLECTION}`)
        .then((response) => {
            return response.data.response;
        }).catch(e => {
            console.log(e);
            throw e;
        })
}

export const getGoogleData = (googleId) => {
    return fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleId}`)
        .then((response) => response.json())
        .then((data) => { return data })
        .catch(e => {
            console.log(e);
            throw e;
        })
}


export default {
    getWhitelist,
    getGoogleData
}