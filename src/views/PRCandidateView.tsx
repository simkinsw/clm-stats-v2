import { useParams } from "react-router-dom";
import H2hMatrix from "../components/PR/H2hMatrix";
import { useFetchHomepage } from "../hooks/fetch";

function PRCandidateView() {
    const { period } = useParams();
    const { data: allPlayers } = useFetchHomepage(period ?? "");

    const candidates = allPlayers?.slice(0, 20).map(entry => entry.player);

    return (
        candidates ? (
            <div className="top20-container">
                <H2hMatrix playerNames={candidates.map(player => player.name)} period={period ?? ""} />
            </div>
        ) : (
            <div className="top20-container">
                Loading Players
            </div>
        )
    );
}

export default PRCandidateView;