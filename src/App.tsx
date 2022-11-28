import { useFetchHomepage } from './hooks/fetch';
import { Player } from './types/player';
import PlayerView from './views/PlayerView';
import PRCandidateView from './views/PRCandidateView';

//TODO
const period = 3;

function App() {

    //TODO use the loading/error to display something?
    const {data, loading, error} = useFetchHomepage(period);

    let top20: Player[] = [];
    if(data) {
        top20 = data?.slice(0, 20).map(row => row.player);
    }

    return (
        data ? 
            <div className="App">
                <PlayerView player={data[13]} period={period} />
            </div>
            : <div>loading...</div>
    );
}

export default App;
