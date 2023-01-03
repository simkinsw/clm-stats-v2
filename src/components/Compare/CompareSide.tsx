import { HomepageEntry } from "../../types/homepageData";
import playerData from "../../_data/player-data.json";
import { AdditionalPlayerData } from "../../types/player";

type CompareSideProps = {
    data: HomepageEntry | undefined;
    side: string
}

function CompareSide({ data, side }: CompareSideProps) {
    if (!data) return <></>;

    const additionalPlayerData = new Map(Object.entries(playerData)) as AdditionalPlayerData;

    let summerRank = "unranked";
    if(additionalPlayerData.has(data.player.name)) {
        const rank = additionalPlayerData.get(data.player.name)!.summerRank?.toString();
        summerRank = rank ? `#${rank}` :  "unranked";
    }

    return (
        <div className={`compare-side compare-side__${side}`}>
            <CompareSideTile heading="Current Position" value={`#${data.rank}`} />
            <CompareSideTile heading="Rating" value={data.player.conservativeRating.toFixed(0)} />
            <CompareSideTile heading="Win - Loss" value={`${data.player.wins} - ${data.player.losses}`} />
            <CompareSideTile heading="PR Events" value={data.player.prEvents} />
            <CompareSideTile heading="Summer Rank" value={summerRank} />
        </div>
    )
}

function CompareSideTile({ heading, value }: { heading: string, value: string | number }) {
    return (
        <div className="compare-side__tile">
            <div className="compare-side__heading">{heading}</div>
            <div className="compare-side__value">{value}</div>
        </div>
    )
}

export default CompareSide;