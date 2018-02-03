import React from 'react';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import Routes from '../routes';

const App = () =>
    <div>
        <h1>Methanex</h1>
        { Routes }
        <footer className={ footer }>
            <Link to="/portfolio">My portfolio</Link>
            <Link to="/resources">My resources</Link>
        </footer>
    </div>;

export default App;
