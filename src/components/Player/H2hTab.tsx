import { H2hData } from "../../types/h2hData";
import HeadToHead from "./HeadToHead";

type H2hProps = {
    h2hData: H2hData | undefined;
    period: string;
    player: string;
}

function H2hTab({ h2hData, period, player }: H2hProps) {
    if (!h2hData) return <div className="player-h2h-container">No head to head data found...</div>;

    return (
        <div className="player-h2h-container">
            {h2hData.map(h2h => <HeadToHead h2h={h2h!} player={player} period={period} />)}
        </div>
    )
}

export default H2hTab;