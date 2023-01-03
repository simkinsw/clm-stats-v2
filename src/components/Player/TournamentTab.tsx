import { TournamentData } from "../../types/tournamentData";
import TournamentSummary from "./TournamentSummary";

type TournamentProps = {
    tournamentSummaries: TournamentData | undefined;
    player: string;
}

function TournamentTab({ tournamentSummaries, player }: TournamentProps) {
    if (!tournamentSummaries) return <div className="tournament-summaries">No tournament data found...</div>;

    return (
        <div className="tournament-summaries">
            {tournamentSummaries!.map(tsum => <TournamentSummary player={player} tournament={tsum} />)}
        </div>
    );
}

export default TournamentTab;