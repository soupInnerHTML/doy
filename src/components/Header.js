import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <div>
            <Link to={"/"}>home</Link>
            <Link to={"/timetable"}>timetable</Link>
            <Link to={"/groups"}>groups</Link>
        </div>
    );
};

export default Header;
