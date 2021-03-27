import http from "./http";

export const getAllBooks = () => {
    return http.get('/book');
}

export const getChapter = (id) => {
    return http.get(`/book/${id}/chapter`);
}