import { H2hEntry, Set } from "../../types/h2hData";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

type H2hProps = {
    h2h: H2hEntry;
    player: string;
    period: string
}

//TODO: filter out DQs? (unless the backend already does?)
function HeadToHead ({ h2h, player, period }: H2hProps) {
    const [setsVisible, setSetsVisible] = useState(false);

    if(!h2h.sets || h2h.sets.length === 0) return <></>;

    const sets = h2h.sets.slice().reverse();

    const wins = sets.filter(set => set.setInfo.won).length;
    const losses = sets.length - wins;

    const className = wins > losses ? "h2h-positive" : wins < losses ? "h2h-negative" : "h2h-even"

    const latestTournament = sets[0].tournamentName.split(":")[0];
    const latestResult = `${sets[0].setInfo.winnerName} ${sets[0].setInfo.wonGames} - ${sets[0].setInfo.lostGames}`;

    return (
        <div className="h2h-container" onClick={() => setSetsVisible(!setsVisible)}>
            <div className={"h2h " + className}>
                <span className="h2h__rank">{`#${h2h.rank}`}</span>
                <span className="h2h__opponent"><Link onClick={(e) => {e.stopPropagation()}} className="h2h__opponent" to={`/stats-v2-alpha/${period}/player/${h2h.opponent}`}>{h2h.opponent}</Link></span>
                <span className="h2h__record">{`${wins} - ${losses}`}</span>
                <span className="h2h__latest">{`${latestTournament} (${latestResult})`}</span>
                <FaChevronDown className={`h2h__chevron h2h__chevron-${setsVisible}`} />
            </div>
            <div className="h2h__sets--expand-container">
                <div className={`h2h__sets h2h__sets-${setsVisible}`}>
                    {h2h.sets.map(set => <H2hSetDetails player={player} set={set} tournament={set.tournamentName.split(":")[0]}/>)}
                </div>
            </div>
        </div>
    );
}

function H2hSetDetails( { player, set, tournament }: { player: string, set: Set, tournament: string }) {
    return (
        <div className={`h2h-set h2h-set-${set.setInfo.won}`}>
            <span className="h2h-set__result">
                {`${set.setInfo.wonGames} - ${set.setInfo.lostGames} at ${tournament} (${set.date})`}
            </span>
        </div>
    );
}

export default HeadToHead;