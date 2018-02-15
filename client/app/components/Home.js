import React from 'react';
import { home } from '../styles/home.scss';
import Login from './Login';

const Home = () =>
    <div className={ home }>
      {/* <p> Hello Jane! </p> */}
      <Login/>
    </div>;

export default Home;
