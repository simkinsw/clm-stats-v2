import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CompareSide from "../components/Compare/CompareSide";
import CompareSideDefault from "../components/Compare/CompareSideDefault";
import H2hTab from "../components/Player/H2hTab";
import PlayerHeader from "../components/Player/PlayerHeader";
import TournamentTab from "../components/Player/TournamentTab";
import { useFetchHomepageEntry, useFetchPlayerH2hs, useFetchPlayerTournaments } from "../hooks/fetch";

function PlayerView() {
    const { player: playerName } = useParams();
    const [queryParams] = useSearchParams();
    const period = queryParams.get("period");
    const { data: tournamentSummaries } = useFetchPlayerTournaments(playerName ?? "", period ?? "");
    const { data: h2hData } = useFetchPlayerH2hs(playerName ?? "", period ?? "");  
    const { data: player } = useFetchHomepageEntry(playerName ?? "", period ?? "");
    const [activeTab, setActiveTab] = useState("h2h");

    return (
        <div className="player-view">
            <PlayerHeader player={player} period={period ?? ""} />
                <div className="player-body">
                {h2hData ? <CompareSide data={player} side="left" /> : <CompareSideDefault side="left" />}
                <div className="player-content">
                    <ul className="player-tabs">
                        <li className={`player-tab player-tab-${activeTab==="h2h"}`} onClick={() => setActiveTab("h2h")}>Head To Head</li>
                        <li className={`player-tab player-tab-${activeTab==="tourney"}`} onClick={() => setActiveTab("tourney")}>Tournaments</li>
                    </ul>
                    {activeTab === "h2h" && <H2hTab h2hData={h2hData} period={period ?? ""} player={playerName ?? ""} />}
                    {activeTab === "tourney" && <TournamentTab tournamentSummaries={tournamentSummaries} player={playerName ?? ""} />}
                </div>
            </div>
        </div>
    );
}


export default PlayerView;