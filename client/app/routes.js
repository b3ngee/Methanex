import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Project from './components/Project';
import Resource from './components/Resource';
import Setting from './components/Setting';

export default (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/portfolio" component={Portfolio} />
		<Route exact path="/project" component={Project} />
		<Route exact path="/resource" component={Resource} />
		<Route exact path="/setting" component={Setting} />
	</Switch>
);
