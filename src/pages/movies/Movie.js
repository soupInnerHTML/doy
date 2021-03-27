import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getMovie, getMovieQuotes} from "../../services/moviesService";

const Movie = () => {

    const [movieData, setMovieData] = useState({})
    const [quotes, setQuotes] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getMovie(id).then(({data}) => {
            console.log(data.docs[0])
            setMovieData(data.docs[0])
        })

        getMovieQuotes(id).then(({data}) => {
            console.log(data.docs)
            setQuotes(data.docs)
        })
    }, [])
    return (
        <div>
            <h1>{movieData.name}</h1>
            <p>Budget: {movieData.budgetInMillions} 000 000 $</p>
            <p>Runtime: {movieData.runtimeInMinutes} min</p>
            <p>Academy award nominations: <b>{movieData.academyAwardNominations}</b></p>
            <p>Academy award wins: <b>{movieData.academyAwardWins}</b></p>


            <h2>quotes:</h2>
            <ul>
                {quotes.length ? quotes.map(quote => {
                    return (
                        <li>
                            <i>{quote.dialog}</i>
                        </li>
                    )
                }) : 'No quotes... :^('}
            </ul>
        </div>
    );
};

export default Movie;