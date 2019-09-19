import React from "react";
import {Switch, Route} from "react-router-dom";
import EmployerLanding from "./components/EmployerLanding"
import JobListings from "./components/JobListings"
import LoginAndRegister from "./components/LoginAndRegister"
import UserLanding from "./components/UserLanding"

export default (
    <Switch>
        <Route path="/employer" component={EmployerLanding} />
        <Route path="/login" component={LoginAndRegister} />
        <Route path="/user" component={UserLanding} />
        <Route exact path="/" component={JobListings} />
    </Switch>
)