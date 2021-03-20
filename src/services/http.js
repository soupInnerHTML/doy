import axios from "axios";

export default axios.create({
    baseURL: 'https://the-one-api.dev/v2',
    headers: {
        Authorization: ''
    }
})