import axios from "axios"

const HOST = process.env.HOST_API

export default axios.create({
    baseURL: HOST + '/api/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})