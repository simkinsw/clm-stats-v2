import { useFetchHomepageEntry } from "../../hooks/fetch";
import CompareHeader from "./CompareHeader";
import CompareMain from "./CompareMain";
import CompareSide from "./CompareSide";

type PlayerCompareProps = {
    player1: string;
    player2: string;
    period: string;
}

function PlayerCompare({ player1, player2, period }: PlayerCompareProps) {

    const { data: p1Data } = useFetchHomepageEntry(player1, period);
    const { data: p2Data } = useFetchHomepageEntry(player2, period);

    return (
        p1Data && p2Data ?
        <div className="compare-container">
            <CompareHeader p1Data={p1Data} p2Data={p2Data} />
            <div className="compare-body">
                <CompareSide data={p1Data} side="left" />
                <CompareMain player1={player1} player2={player2} period={period} />
                <CompareSide data={p2Data} side="right" />
            </div>
        </div>
        : <div className="placeholder">Loading...</div>
    )
}

export default PlayerCompare;