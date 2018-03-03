import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Project from './components/Project';
import Resource from './components/Resource';
import Setting from './components/Setting';
import Login from './components/Login';
import StandardUser from './components/StandardUser';
import AddSkill from './components/AddSkill';


const isLoggedIn = () => {
	if (!localStorage.getItem('user_id')) {
		return false;
	}
	return true;
};

export default (
	<Switch>
		<Route exact path="/" render={() => (isLoggedIn() ? (<Home />) : (<Redirect to="/login"/>))} />
		<Route exact path="/portfolio" render={() => (isLoggedIn() ? (<Portfolio />) : (<Redirect to="/login"/>))} />
		<Route exact path="/project" render={() => (isLoggedIn() ? (<Project />) : (<Redirect to="/login"/>))} />
		<Route exact path="/resource" render={() => (isLoggedIn() ? (<Resource />) : (<Redirect to="/login"/>))} />
		<Route exact path="/setting" render={() => (isLoggedIn() ? (<Setting />) : (<Redirect to="/login"/>))} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/standardUser" render={() => (isLoggedIn() ? (<StandardUser />) : (<Redirect to="/login"/>))} />
	    <Route exact path="/addSkill" render={() => (isLoggedIn() ? (<AddSkill />) : (<Redirect to="/login"/>))} />
	</Switch>
);
