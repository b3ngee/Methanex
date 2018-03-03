import React from 'react';
import { home } from '../styles/home.scss';
// import Login from './Login';

const Home = () =>
    <div className={ home }>
      <p> Hello {localStorage.getItem('user_name')}! </p>
    </div>;

export default Home;
