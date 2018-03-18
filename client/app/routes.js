import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import PortfolioDetail from './components/PortfolioDetail';
import Project from './components/Project';
import Resource from './components/Resource';
import Setting from './components/Setting';
import Login from './components/Login';
import Skill from './components/Skill';
import AddExistingSkillForm from './components/AddExistingSkillForm';
import ProjectDetail from './components/ProjectDetail';
import ResourceDetail from './components/ResourceDetail';
import ReportingModule from './components/ReportingModule';
import AddPortfolioForm from './components/AddPortfolioForm';
import EditProjectForm from './components/EditProjectForm';
import AddProjectForm from './components/AddProjectForm';
import EditResourceForm from './components/EditResourceForm';

const isLoggedIn = () => {
	if (!localStorage.getItem('user_id')) {
		return false;
	}
	return true;
};

export default (
	<Switch>
		<Route exact path="/" render={() => (isLoggedIn() ? (<Profile />) : (<Redirect to="/login"/>))} />
		<Route exact path="/portfolio" render={() => (isLoggedIn() ? (<Portfolio />) : (<Redirect to="/login"/>))} />
        <Route exact path="/portfolio/report" component={ReportingModule} />
		<Route exact path="/portfolio/addnewportfolio" component={AddPortfolioForm} />
		    <Route path={'/portfolio/:portfolio_id'} component={ PortfolioDetail } />
		<Route exact path="/project" render={() => (isLoggedIn() ? (<Project />) : (<Redirect to="/login"/>))} />
		<Route exact path="/project/report" component= {ReportingModule} />
		<Route exact path="/project/add" component={AddProjectForm} />
		<Route exact path="/project/edit" component= {EditProjectForm} />
		    <Route path={'/project/:project_id'} component={ ProjectDetail } />
		<Route exact path="/resource" render={() => (isLoggedIn() ? (<Resource />) : (<Redirect to="/login"/>))} />
        <Route exact path="/resource/report" component= {ReportingModule} />
        <Route exact path="/resource/edit" component= {EditResourceForm} />
        	<Route path={'/resource/:resource_id'} component={ ResourceDetail } />
		<Route exact path="/setting" render={() => (isLoggedIn() ? (<Setting />) : (<Redirect to="/login"/>))} />
		<Route exact path="/login" component={Login} />
        <Route exact path="/skill" render={() => (isLoggedIn() ? (<Skill />) : (<Redirect to="/login"/>))} />
	        <Route exact path="/addSkill" render={() => (isLoggedIn() ? (<AddExistingSkillForm userId={localStorage.getItem('user_id')}/>) : (<Redirect to="/login"/>))} />
	</Switch>
);
