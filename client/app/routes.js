import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Portfolios from './components/Portfolios';

export default (
	<Switch>
		<Route exact path="/portfolio" component={Portfolios} />
	</Switch>
);
