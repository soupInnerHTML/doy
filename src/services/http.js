import axios from "axios";

export default axios.create({
    baseURL: 'https://the-one-api.dev/v2',
    headers: {
        Authorization: 'Bearer M2Pjj9IfHBM5cCwjO_rR'
    }
})