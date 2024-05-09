import { useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Hero from './components/hero';
// import './App.css';

function App() {
    return (
        <div>
            <Hero host={'localhost'} />
        </div>
    );
}

export default App;
