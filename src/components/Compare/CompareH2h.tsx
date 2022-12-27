import { useEffect, useState } from "react";
import { H2hEntry } from "../../types/h2hData";

type CompareH2hProps = {
    h2h: H2hEntry
}

function CompareH2h({ h2h }: CompareH2hProps) {
    const [sets, setSets] = useState<[number, number]>([0, 0]);
    const [games, setGames] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        const p1Sets = h2h.sets.filter(set => set.setInfo.won).length;
        setSets([p1Sets, h2h.sets.length - p1Sets]);

        let p1Games = 0;
        let p2Games = 0;
        for (const set of h2h.sets) {
            if(!set.setInfo.dq) {
                p1Games += parseInt(set.setInfo.wonGames);
                p2Games += parseInt(set.setInfo.lostGames);
            }
        }
        setGames([p1Games, p2Games]);
    }, [h2h])

    return (
        <div className="compare-bars">
            <CompareBar title="Set Count" values={sets} />
            <CompareBar title="Game Count" values={games} />
        </div>
    )
} 

function CompareBar({ title, values }: { title: string, values: [number, number] }) {
    const bluePercent = 100 * values[0] / (values[0] + values[1]);

    return (
        <div className="compare-bar" 
            style={{background: `linear-gradient(to right, #d9e8f1 0%, #d9e8f1 ${bluePercent}%, #f3d1d6 ${bluePercent}%, #f3d1d6 100%)`}}
        >
            <div className="compare-bar__title">{title}</div>
            <div className="compare-bar__values">{`${values[0]} - ${values[1]}`}</div>
        </div>
    )
}

export default CompareH2h;