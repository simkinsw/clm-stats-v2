import PlayerHeader from "../components/PlayerHeader";
import TournamentSummary from "../components/TournamentSummary";
import { useFetchPlayerTournaments } from "../hooks/fetch";
import { HomepageEntry } from "../types/homepageData";

type PlayerViewProps = {
    player: HomepageEntry;
    period: number;
}

function PlayerView({ player, period }: PlayerViewProps){

    const { data: tournamentSummaries, loading, error } = useFetchPlayerTournaments(player.player.name, period);

    return (
        <div className="player-view">
            <PlayerHeader player={player} />
            {tournamentSummaries && tournamentSummaries!.map(tsum => <TournamentSummary player={player.player.name} tournament={tsum} />)}
        </div>
    );
}

export default PlayerView;