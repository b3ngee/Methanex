import React from 'react';
// import { footer } from '../styles/footer.scss';
import Routes from '../routes';
import Navbar from './Navbar';

const App = () =>
    <div>
        <Navbar/>
        { Routes }
const App = () =>
    <div>
        <h2>Methanex</h2>
        { Routes }
        <footer className={ footer }>
            <Link to="/portfolio">My portfolio</Link>
            <Link to="/projects">My projects</Link>
            <Link to="/resources">My resources</Link>
        </footer>

    </div>;

export default App;
