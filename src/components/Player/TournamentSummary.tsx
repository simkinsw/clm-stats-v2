import { Tournament } from "../../types/tournamentData";
import { FaChevronDown } from "react-icons/fa";
import { SetInfo } from "../../types/h2hData";
import { useState } from "react";

function TournamentSummary( { player, tournament }: { player: string, tournament: Tournament }) {

    const [activeSet, setActiveSet] = useState<SetInfo | undefined>(tournament.setSummaries[0]);
    const [expanded, setExpanded] = useState(false);

    function hoverTooltip(set: SetInfo | undefined) {
        setActiveSet(set);
    }

    let tournamentName = tournament.event.tournamentName.split(":")[0];

    if(tournamentName.includes("Midlane Melee")) {
        const number = tournament.event.slug.split("/")[1].split("-")[2];
        if(parseInt(number) < 62) tournamentName += " " + number;
    }

    return (
        <div className="tsum">
            <div className="tsum__event">
                <div className="tsum__event--image-container">
                    <img src={tournament.event.imageUrl} alt="" className="tsum__event--image" />
                </div>
                <div className="tsum__event--title">
                    <a href={`https://start.gg/${tournament.event.slug}`} className="tsum__event--link">
                        <div className="tsum__event--tourney">{tournamentName}</div>
                    </a>
                    <div className="tsum__event--info">
                        <span className="tsum__event--date">{tournament.event.dateString}</span>
                    </div>
                </div>
                <div className="tsum__wins">
                    <span className="tsum__wins--header">Win - Loss</span>
                    <span className="tsum__wins--value">{`${tournament.numWins} - ${tournament.numLosses}`}</span>
                </div>
            </div>
            <div className="tsum__result">
                <div className="tsum__record">   
                    <span className="tsum__record--placing">{tournament.placingString}</span>
                    <span className="tsum__record--entrants"> / {tournament.event.numEntrants}</span>
                </div>
                <div className="tsum__sets">
                    <ul className="tsum__sets--container">
                        {
                            tournament.setSummaries.slice(0).reverse().map((set) =>{
                                return (
                                    <li
                                        onMouseEnter={() => hoverTooltip(set)}
                                        onMouseLeave={() => hoverTooltip(undefined)}
                                        className={"tsum__sets--set " + (set.won ? "tsum__sets--W" : "tsum__sets--L")}
                                    >
                                        {set.won ? "W" : "L"}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <SetTooltip player={player} set={activeSet} />
            {/*
            <FaChevronDown className={`tsum__chevron tsum__chevron-${expanded}`} onClick={() => setExpanded(!expanded)} />
            <div className="tsum__details--expand-container">
                <div className={`tsum__details tsum__details-${expanded}`}>
                    {tournament.setSummaries.map(set => <SetDetails player={player} set={set} />)}
                </div>
            </div>
                    */}
        </div>
    )
}

//TODO: sets are sorted wrong
function SetDetails( { player, set }: { player: string, set: SetInfo }) {
    return (
        <div className="set-detail">
            <div className="set-detail__round">{set.round}</div>
            <div className={"set-detail__score"}>
                <div className={`set-detail__score--player set-detail__score--player-${set.won}`}>
                    <span className="set-detail__score--tag">{player}</span>
                    <span className="set-detail__score--games">{set.wonGames}</span>
                </div>
                <div className={`set-detail__score--opponent set-detail__score--opponent-${set.won}`}>
                    <span className="set-detail__score--games">{set.lostGames}</span>
                    <span className="set-detail__score--tag">{set.opponentName}</span>
                </div>
            </div>
        </div>
    );
}

function SetTooltip( { player, set }: { player: string, set: SetInfo | undefined }) {
    return (
        <div className={"set-tooltip"}>
            <div className={`set-tooltip__player set-tooltip__player-${set?.won}`}>
                <span className="set-tooltip__tag">{player}</span>
                <span className="set-tooltip__games">{set?.wonGames ?? "?"}</span>
            </div>
            <div className={`set-tooltip__opponent set-tooltip__opponent-${set?.won}`}>
                <span className="set-tooltip__games">{set?.lostGames ?? "?"}</span>
                <span className="set-tooltip__tag">{set?.opponentName ?? "?"}</span>
            </div>
        </div>
    );
}

export default TournamentSummary;