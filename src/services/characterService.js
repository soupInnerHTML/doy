import http from "./http";

export const getCharters = async () => {
    return http.get('/character')
}

export const getCharter = async (id) => {
    return http.get('/character/' + id)
}

export const getCharterQuotes = async (id) => {
    return http.get(`/character/${id}/quote`)
}