import { useParams } from "react-router-dom";
import PlayerCompare from "../components/Compare/PlayerCompare";

/*
    TODO: 
    - fallback if players aren't defined
    - Add out of region results?
    - Font sizes are messed up
*/


function CompareView() {
    const { player1, player2 } = useParams();
    const { period } = useParams();

    return (
        !!player1 && !!player2 && !!period ?
         <PlayerCompare player1={player1} player2={player2} period={period} />
         : <div className="placeholder">No players defined</div>
    );
}

export default CompareView;