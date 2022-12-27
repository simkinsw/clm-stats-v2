import { useEffect, useState } from "react";
import { Tournament, TournamentData } from "../../types/tournamentData";

type CompareTournamentsProps = {
    p1Tournaments: TournamentData,
    p2Tournaments: TournamentData
}

function CompareTournaments({ p1Tournaments, p2Tournaments }: CompareTournamentsProps) {
    const [tournamentList, setTournamentList] = useState<Array<[Tournament, Tournament]>>([]);

    useEffect(() => {
        const matchedEvents: Array<[Tournament, Tournament]> = [];

        for(const p1Tourney of p1Tournaments) {
            const eventID = p1Tourney.event.id;
            const p2Tourney = p2Tournaments.find((t) => t.event.id === eventID);

            if(p2Tourney) {
                matchedEvents.push([p1Tourney, p2Tourney]);
            }
        }

        setTournamentList(matchedEvents);
    }, [p1Tournaments, p2Tournaments])

    return (
        <div className="compare-sets">
            <div className="compare-main__header">Tournaments</div>
            { tournamentList.map(tourneys => <TournamentBar tourneys={tourneys} />)}
        </div>
    )
}

function TournamentBar({ tourneys }: { tourneys: [Tournament, Tournament] }) {
    const p1Placement = parseInt(tourneys[0].placingString.slice(0, tourneys[0].placingString.length - 2));
    const p2Placement = parseInt(tourneys[1].placingString.slice(0, tourneys[1].placingString.length - 2));

    const p1Better = p1Placement < p2Placement ? "true" : p1Placement > p2Placement ? "false" : "equal";

    let tournamentName = tourneys[0].event.tournamentName;
    if(tournamentName.includes("Midlane Melee")) {
        const number = tourneys[0].event.slug.split("/")[1].split("-")[2];
        if(parseInt(number) < 62) tournamentName += " " + number;
    }

    return (
        <div className="compare-sets__set">
            <div className={`compare-sets__score compare-sets__score--left compare-sets__score--left-${p1Better}`}>
                {p1Placement}<span className="compare-sets__entrants">/{tourneys[0].event.numEntrants}</span>
            </div>
            <div className="compare-sets__text">
                <div className="compare-sets__tourney">{tournamentName}</div>
                <div className="compare-sets__date">{tourneys[0].event.dateString}</div>
            </div>
            <div className={`compare-sets__score compare-sets__score--right compare-sets__score--right-${p1Better}`}>
            {p2Placement}<span className="compare-sets__entrants">/{tourneys[0].event.numEntrants}</span>
            </div>
        </div>
    )
}

export default CompareTournaments;