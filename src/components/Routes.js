import React from 'react';
import {Route, Switch} from "react-router-dom";
import TimetablePage from "./Timetable/TimetablePage";
import NotFoundPage from "./NotFoundPage";
import Groups from "./Groups/Groups";

export default () => {
    return (
        <Switch>
            <Route exact path={'/timetable'} component={TimetablePage}/>
            <Route exact path={'/groups/:id?'} component={Groups}/>
            <Route exact path={'*'} component={NotFoundPage}/>
        </Switch>
    )
}