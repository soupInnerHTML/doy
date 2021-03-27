import './App.css';
import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import BookList from "./pages/books/BookList";
import ChapterList from "./pages/books/ChapterList.js";
import MovieList from "./pages/movies/MovieList";
import Movie from "./pages/movies/Movie";
import CharacterList from "./pages/characters/CharacterList";
import Character from "./pages/characters/Character";

export default () => {
   return (
       <BrowserRouter>
           <Switch>
               <Route path={'/'} component={() => {
                   return (
                       <>
                            <Link to={'/books'}>Books</Link>
                            <br/>
                            <Link to={'/movies'}>Movies</Link>
                           <br/>
                           <Link to={'/characters'}>Characters</Link>
                       </>
                   )
               }} exact />

              <Route path={'/books'} component={BookList} exact />
              <Route path={'/books/:id/chapters'} component={ChapterList} exact />

              <Route path={'/movies'} component={MovieList} exact />
              <Route path={'/movies/:id'} component={Movie} exact />

               <Route path={'/characters'} component={CharacterList} exact />
               <Route path={'/character/:id'} component={Character} exact />
           </Switch>

       </BrowserRouter>
   )
}