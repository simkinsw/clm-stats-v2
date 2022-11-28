import { useFetchPlayerH2hs } from "../hooks/fetch";
import { H2hEntry } from "../types/h2hData";

type H2hMatrixProps = {
    playerNames: string[];
    period: number;
}

type H2hRowProps = {
    player: string;
    period: number;
    rank: number;
}

function H2hMatrix({ playerNames, period }: H2hMatrixProps) {

    return (
        <div className="matrix">
            <div className="matrix__row">
                <div className="matrix__left-label"></div>
                {playerNames.map(name => <div className="matrix__top-label">{name}</div>)}
            </div>
            {playerNames.map((name, i) => <H2hRow player={name} period={period} rank={i}/>)}
        </div>
    )
}

function H2hRow({ player, period, rank }: H2hRowProps) {
    const { data, loading, error } = useFetchPlayerH2hs(player, period);

    let editedData: Array<H2hEntry | undefined> = [];

    if(!!data) {
        editedData = [...data.slice(0, rank), undefined, ...data.slice(rank, 19)];
        console.log(editedData);
    }

    return (
        data ?
        <div className="matrix__row">
            <div className="matrix__left-label">{player}</div>
            {editedData.map(h2h => <H2hCell h2h={h2h} />)}
        </div>
        : <div className="loading">no data</div>
    )
}

function H2hCell( { h2h }: {h2h : H2hEntry | undefined}) {
    if(h2h === undefined) {
        return <div className="matrix__cell matrix__cell--empty"></div>
    }

    const numWins = h2h.sets.filter(set => set.setInfo.won).length;
    const numLosses = h2h.sets.filter(set => !set.setInfo.won).length;

    const className = numWins > numLosses ? "matrix__cell--positive"
                    : numWins < numLosses ? "matrix__cell--negative"
                    : "matrix__cell--even"

    return (
        <div className={"matrix__cell " + className}>{`${numWins} - ${numLosses}`}</div> 
    )
}




export default H2hMatrix;


