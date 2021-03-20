import http from "./http";

export const getAllBooks = () => {
    return http.get('/book');
}

export const getChartersByBookId = (id) => {
    return http.get(`/book/${id}/charter`);
}