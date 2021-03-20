import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import BookList from "./pages/books/BookList";
import CharterList from "./pages/books/CharterList.js";

export default () => {
   return (
       <BrowserRouter>
           <Switch>
              <Route path={'/books'} component={BookList} exact />
              <Route path={'/charters'} component={CharterList} exact />
           </Switch>
       </BrowserRouter>
   )
}