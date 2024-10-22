// app.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/app.css';
import HomeScreen from './pages/HomeScreenEmpty'
const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                <Route path="/" element={<HomeScreen />} />
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
