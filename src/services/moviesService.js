import http from "./http";

export const getAllMovies = async () => {
    return http.get('/movie')
}

export const getMovie = async (id) => {
    return http.get('/movie/' + id)
}

export const getMovieQuotes = async (id) => {
    return http.get(`/movie/${id}/quote`)
}