import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  
import TopNav from './components/TopNav';
import CompareView from './views/CompareView';
import PlayerView from './views/PlayerView';
import HomeView from './views/HomeView';

function App() {
    const defaultPeriod = process.env.REACT_APP_DEFAULT_PERIOD ?? "4";

    return (
        <Router>
            <div className="App">
                <TopNav />
                <Routes>  
                    <Route path={"/stats-v2-alpha/"} element={<Navigate to={`/stats-v2-alpha/${defaultPeriod}`} replace />} />
                    <Route path={"/stats-v2-alpha/:period"} element={<HomeView />}></Route>  
                    <Route path={"/stats-v2-alpha/:period/player/:player"} element={<PlayerView />}></Route>  
                    <Route path={`stats-v2-alpha/:period/compare/:player1/:player2`} element={<CompareView />}></Route>  
                    {/*
                    <Route path={"/stats-v2-alpha/:period/pr"} element={<PRCandidateView />}></Route>  
                    */}
                </Routes>  
            </div>
        </Router>
    );
}

export default App;
