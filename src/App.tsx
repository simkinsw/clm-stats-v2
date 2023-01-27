import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import TopNav from './components/TopNav';
import CompareView from './views/CompareView';
import PlayerView from './views/PlayerView';
import HomeView from './views/HomeView';

function App() {
    return (
        <Router>
            <div className="App">
                <TopNav />
                <Routes> 
                    <Route path={"/stats-v2-alpha"} element={<HomeView />}></Route>  
                    <Route path={"/stats-v2-alpha/player/:player"} element={<PlayerView />}></Route>  
                    <Route path={`stats-v2-alpha/compare/:player1/:player2`} element={<CompareView />}></Route>  
                    {/*
                    <Route path={"/stats-v2-alpha/:period/pr"} element={<PRCandidateView />}></Route>  
                    */}
                </Routes>  
            </div>
        </Router>
    );
}

export default App;
