import { Set } from "../../types/h2hData";

type CompareSetsProps = {
    sets: Set[]
}

function CompareSets({ sets }: CompareSetsProps) {
    return (
        <div className="compare-sets">
            <div className="compare-main__header">Sets</div>
            { sets.map(set => <SetBar set={set} />)}
        </div>
    )
}

function SetBar({ set }: { set: Set }) {
    return (
        <div className="compare-sets__set">
            <div className={`compare-sets__score compare-sets__score--left compare-sets__score--left-${set.setInfo.won}`}>{set.setInfo.wonGames}</div>
            <div className="compare-sets__text">
                <div className="compare-sets__tourney">{`${set.tournamentName} - ${set.setInfo.round}`}</div>
                <div className="compare-sets__date">{set.date}</div>
            </div>
            <div className={`compare-sets__score compare-sets__score--right compare-sets__score--right-${set.setInfo.won}`}>{set.setInfo.lostGames}</div>
        </div>
    )
}

export default CompareSets;