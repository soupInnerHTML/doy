import React, {useEffect, useState} from 'react';
import {getChapter} from "../../services/bookService";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const ChapterList = () => {
    const {id} = useParams()
    const [chapters, setChapters] = useState([])
    useEffect(() => {
        getChapter(id).then(({data}) => {
            console.log(data.docs)
            setChapters(data.docs)
        })
    }, [])
    return (
        <ul>
            {
                chapters.map(chapter => {
                    return (
                        <li>
                            {/*<Link to={'/'}>*/}
                                {chapter.chapterName}
                            {/*</Link>*/}
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default ChapterList;