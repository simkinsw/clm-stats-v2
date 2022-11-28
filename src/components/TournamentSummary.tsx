import { Tournament } from "../types/tournamentData";
import { BsPeopleFill } from "react-icons/bs";
import { AiFillCalendar } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { SetInfo } from "../types/h2hData";
import { useState } from "react";

function TournamentSummary( { player, tournament }: { player: string, tournament: Tournament }) {

    const [activeSet, setActiveSet] = useState<SetInfo>(tournament.setSummaries[0]);
    const [visibleTooltip, setVisibleTooltip] = useState(false);
    const [expanded, setExpanded] = useState(false);

    function hoverTooltip(set: SetInfo) {
        setActiveSet(set);
        setVisibleTooltip(true);
    }

    let tournamentName = tournament.event.tournamentName.split(":")[0];

    if(tournamentName.includes("Midlane Melee")) {
        const number = tournament.event.slug.split("/")[1].split("-")[2];
        tournamentName += " #" + number;
    }

    return (
        <div className="tournament-summary">
            <div className="tournament-summary__event">
                <div className="tournament-summary__event--image-container">
                    <img src={tournament.event.imageUrl} alt="" className="tournament-summary__event--image" />
                </div>
                <div className="tournament-summary__event--title">
                    <a href={`https://start.gg/${tournament.event.slug}`} className="tournament-summary__event--tourney-link">
                        <h1 className="tournament-summary__event--tourney">{tournamentName}</h1>
                    </a>
                    <p className="tournament-summary__event--info">
                        <AiFillCalendar style={{transform: "translateY(.3rem)"}} /><span className="tournament-summary__event--date">{tournament.event.dateString}</span>
                        <BsPeopleFill style={{transform: "translateY(.3rem)"}} /><span className="tournament-summary__event--entrants">{tournament.event.numEntrants}</span>
                    </p>
                </div>
                <div className="tournament-summary__event--placing">{tournament.placingString}</div>
            </div>
            <div className="tournament-summary__result">
                <div className="tournament-summary__result--record">
                    <span className="tournament-summary__result--record-header">Wins - Losses</span>
                    <span className="tournament-summary__result--record-value">{`${tournament.numWins} - ${tournament.numLosses}`}</span>
                </div>
                {tournament.losses.length > 0 ? ( 
                    <div className="tournament-summary__result--losses">
                            <span className="tournament-summary__result--losses-header">Lost to</span>
                            <span className="tournament-summary__result--losses-names">{tournament.losses.join(", ")}</span>
                    </div>
                    ) : <div className="tournament-summary__result--losses">
                        <span className="tournament-summary__result--losses-header">No Losses</span>
                    </div>
                }   
                <div className="tournament-summary__result--sets">
                    {!!activeSet && <SetTooltip player={player} set={activeSet} visible={visibleTooltip} />}
                    <div className="tournament-summary__result--sets-container">
                        {
                            tournament.setSummaries.slice(0).reverse().map((set) =>{
                                return (
                                    <div 
                                        onMouseEnter={() => hoverTooltip(set)}
                                        onMouseLeave={() => setVisibleTooltip(false)}
                                        className={"tournament-summary__result--sets-set " + (set.won ? "tournament-summary__result--sets-setW" : "tournament-summary__result--sets-setL")}
                                    >
                                        {set.won ? "W" : "L"}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <FaChevronDown className={"tournament-summary__result--chevron " + `tournament-summary__result--chevron-${expanded}`} onClick={() => setExpanded(!expanded)}/>
            </div>
                <div className="tournament-summary__details--expand-container">
                    <div className={"tournament-summary__details " + `tournament-summary__details-${expanded}`}>
                        {tournament.setSummaries.map(set => <SetDetails player={player} set={set} />)}
                    </div>
                </div>
        </div>
    )
}

//TODO: sets are sorted wrong
function SetDetails( { player, set }: { player: string, set: SetInfo }) {
    return (
        <div className="set-detail">
            <h1 className="set-detail__round">{set.round}</h1>
            <div className={"set-detail__score"}>
                <div className={"set-detail__score--player " + ("set-detail__score--player-" + set.won)}>
                    <span className="set-detail__score--tag">{player}</span>
                    <span className="set-detail__score--games">{set.wonGames}</span>
                </div>
                <div className={"set-detail__score--opponent " + ("set-detail__score--opponent-" + set.won)}>
                    <span className="set-detail__score--games">{set.lostGames}</span>
                    <span className="set-detail__score--tag">{set.opponentName}</span>
                </div>
            </div>
        </div>
    );
}

function SetTooltip( { player, set, visible }: { player: string, set: SetInfo, visible: boolean }) {
    return (
        <div className={"set-tooltip " + (visible ? "set-tooltip__active" : "set-tooltip__inactive")}>
            <div className={"set-tooltip__player " + ("set-tooltip__player-" + set.won)}>
                <span className="set-tooltip__tag">{player}</span>
                <span className="set-tooltip__games">{set.wonGames}</span>
            </div>
            <div className={"set-tooltip__opponent " + ("set-tooltip__opponent-" + set.won)}>
                <span className="set-tooltip__games">{set.lostGames}</span>
                <span className="set-tooltip__tag">{set.opponentName}</span>
            </div>
        </div>
    );
}

export default TournamentSummary;