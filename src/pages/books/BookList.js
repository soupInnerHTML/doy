import React, {useEffect, useState} from 'react';
import {getAllBooks} from "../../services/bookService";
import {Link} from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        (async () => {
            const response = await getAllBooks()
            setBooks(response.data?.docs)
        })()
    }, [])

    return (
        <ul>
            {books.map(book => (
                <li key={book?._id}>
                    <Link to={`books/${book?._id}/charters`}>{book?.name}</Link>
                </li>
            ))}
        </ul>
    );
};

export default BookList;