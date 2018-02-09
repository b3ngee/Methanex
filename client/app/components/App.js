import React from 'react';
// import { footer } from '../styles/footer.scss';
import Routes from '../routes';
import Navbar from './Navbar';
// import { Link } from 'react-router-dom';

const App = () =>
    <div>
        <Navbar/>
        { Routes }
    </div>;

export default App;
