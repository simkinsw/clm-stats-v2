import { H2hData } from "../../types/h2hData";
import HeadToHead from "./HeadToHead";

type H2hProps = {
    h2hData: H2hData;
    period: string;
    player: string;
}

function H2hTab({ h2hData, period, player }: H2hProps) {

    return (
        <div className="player-h2h-container">
            {h2hData.map(h2h => <HeadToHead h2h={h2h!} player={player} period={period} />)}
        </div>
    )
}

export default H2hTab;