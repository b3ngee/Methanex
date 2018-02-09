import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Portfolios from './components/Portfolios';
import Projects from './components/Projects';

export default (
	<Switch>
		<Route exact path="/portfolio" component={Portfolios} />
		<Route exact path="/projects" component={Projects} />
	</Switch>
);
