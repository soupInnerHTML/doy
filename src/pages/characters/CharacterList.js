import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getCharters} from "../../services/characterService";

const CharacterList = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        getCharters().then(({data}) => {
            console.log(data.docs)
            setCharacters(data.docs)
        })
    }, [])

    return (
        <ul>
            {
                characters.map(character => (
                    <li key={character._id}>
                        <Link to={`character/${character._id}/`}>
                            {character.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
};

export default CharacterList;