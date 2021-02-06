import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const Groups = () => {

    const {id} = useParams()
    const [group, setGroup] = useState(null)
    useEffect(() => {
        (async () => {
            let response = await fetch(`https://api.ptpit.ru/groups?filters=id:eq:${id}`)
            let json = await response.json()
            // console.log(json)
            setGroup(json[0])
        })()
    }, [])

    return (
        <div>
            {group ? `Группа ${group.name}\n
            Куратор: ${group.curator_name}\n
            Дата начала обучения: ${group.start_date}\n
            Дата выпуска: ${group.end_date}` : 'Null'}
        </div>
    );
};

export default Groups;
