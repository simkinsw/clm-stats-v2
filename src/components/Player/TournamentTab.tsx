import { TournamentData } from "../../types/tournamentData";
import TournamentSummary from "./TournamentSummary";

type TournamentProps = {
    tournamentSummaries: TournamentData;
    player: string;
}

function TournamentTab({ tournamentSummaries, player }: TournamentProps) {
    return (
        <div className="tournament-summaries">
            {tournamentSummaries!.map(tsum => <TournamentSummary player={player} tournament={tsum} />)}
        </div>
    );
}

export default TournamentTab;