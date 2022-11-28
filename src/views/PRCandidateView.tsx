import H2hMatrix from "../components/H2hMatrix";
import { Player } from "../types/player";

type PRCandidateViewProps = {
    candidates: Player[];
    period: number;
}

function PRCandidateView( { candidates, period }: PRCandidateViewProps) {

    return (
        <div className="top20-container">
            <H2hMatrix playerNames={candidates.map(player => player.name)} period={period} />
        </div>
    );
}

export default PRCandidateView;