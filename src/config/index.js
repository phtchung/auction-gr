import axios from "axios";

const SERVER_URL = "http://localhost:8088"


export const Axios = axios.create({
    baseURL: `${SERVER_URL}`,
    withCredentials: true,
});

export const STREAM_URL = `${SERVER_URL}/events`;

export const ssEvents = new EventSource(STREAM_URL);


