import React, {useEffect, useState} from 'react';
import {getAllMovies} from "../../services/moviesService";
import {Link} from "react-router-dom";

const MovieList = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getAllMovies().then(({data}) => {
            console.log(data.docs)
            setMovies(data.docs)
        })
    }, [])

    return (
        <ul>
            {
                movies.map(movie => (
                    <li key={movie._id}>
                        <Link to={`movies/${movie._id}/`}>
                            {movie.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
};

export default MovieList;