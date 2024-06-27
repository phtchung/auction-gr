import axios from "axios";
import {baseUrl} from "../Services/Http/baseUrl.jsx";

const SERVER_URL = baseUrl


export const Axios = axios.create({
    baseURL: `${SERVER_URL}`,
    withCredentials: true,
});

export const STREAM_URL = `${SERVER_URL}/events`;

export const ssEvents = new EventSource(STREAM_URL);


