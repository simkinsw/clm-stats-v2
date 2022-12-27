import { useFetchPlayerH2hs, useFetchPlayerTournaments } from "../../hooks/fetch";
import { H2hEntry } from "../../types/h2hData";
import PeriodSelector from "../PeriodSelector";
import CompareH2h from "./CompareH2h";
import CompareSets from "./CompareSets";
import CompareTournaments from "./CompareTournaments";

type CompareMainProps = {
    player1: string,
    player2: string,
    period: string
}

function CompareMain({ player1, player2, period }: CompareMainProps) {

    const { data: p1H2h } = useFetchPlayerH2hs(player1, period ?? "");
    const { data: p1Tourneys } = useFetchPlayerTournaments(player1, period ?? "");
    const { data: p2Tourneys } = useFetchPlayerTournaments(player2, period ?? "");

    let directH2h: H2hEntry | undefined = undefined;
    if(p1H2h) {
        directH2h = p1H2h.find(entry => entry?.opponent === player2);
    }

    return (
        <div className="compare-main">
            <PeriodSelector />
            {directH2h && <CompareH2h h2h={directH2h} />}
            {directH2h && <CompareSets sets={directH2h.sets.filter(set => !set.setInfo.dq).slice().reverse()} />}
            {p1Tourneys && p2Tourneys && <CompareTournaments p1Tournaments={p1Tourneys} p2Tournaments={p2Tourneys} />}
        </div>
    );
}


export default CompareMain;