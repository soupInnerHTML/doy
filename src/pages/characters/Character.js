import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getCharter, getCharterQuotes} from "../../services/characterService";

const Character = () => {
    const [characterData, setCharacterData] = useState({})
    const [quotes, setQuotes] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getCharter(id).then(({data}) => {
            console.log(data.docs[0])
            setCharacterData(data.docs[0])
        })

        getCharterQuotes(id).then(({data}) => {
            console.log(data.docs)
            setQuotes(data.docs)
        })
    }, [])

    return (
        <div>
            <h1>{characterData.name}</h1>
            <p>{characterData.gender}</p>
            <p>Race: {characterData.race}</p>
            {characterData.birth && <p>Birth: {characterData.birth}</p>}
            {characterData.death && <p>death: {characterData.death}</p>}
            {characterData.hair && <p>hair: {characterData.hair}</p>}
            {characterData.height && <p>height: {characterData.height}</p>}
            {characterData.spouse && <p>spouse: {characterData.spouse}</p>}

            <a href={characterData.wikiUrl} rel={'noopener noreferrer'}>wiki</a>


            <h2>quotes</h2>
            <ul>
                {quotes.length ? quotes.map(quote => {
                    return (
                        <li>
                            <i key={}>{quote.dialog}</i>
                        </li>
                    )
                }) : 'No quotes... :^('}
            </ul>
        </div>
    );
};

export default Character;