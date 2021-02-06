import './App.css'
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/Routes";
import Header from "./components/Header";

export default () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes/>
        </BrowserRouter>
    )
}

