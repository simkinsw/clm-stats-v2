import { FaTwitch, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HomepageEntry } from "../../types/homepageData";
import { AdditionalPlayerData } from "../../types/player";
import playerData from "../../_data/player-data.json";

type RankingRowProps = {
    data: HomepageEntry,
    period: string,
    rank: number
}

function RankingRow({ data, period, rank }: RankingRowProps) {
    const player = data.player;

    const additionalPlayerData = new Map(Object.entries(playerData)) as AdditionalPlayerData;
    let character: string | undefined = undefined;
    if(additionalPlayerData.has(player.name)) {
        character = additionalPlayerData.get(player.name)!.character;
    }

    let tournamentName = data.event.tournamentName.split(":")[0];
    if(tournamentName.includes("Midlane Melee")) {
        const number = data.event.slug.split("/")[1].split("-")[2];
        if(parseInt(number) < 62) tournamentName += " " + number;
    }
    if(tournamentName.includes("Esports Arena")) {
        tournamentName = tournamentName.split(" ").slice(0, 3).join(" ");
    }

    const date = new Date(data.event.date * 1000);
    const winPercent = player.wins * 100 / (player.wins + player.losses);

    return (
        <div className="ranking-row">
            <div className="ranking-row__item ranking-row__rank">{rank}</div>

            <img src={player.profileImage} className="ranking-row__item ranking-row__avatar" alt="profile pic" />

            <div className="ranking-row__item ranking-row__name">
                <div className="ranking-row__name--top">
                    <Link className="ranking-row__name--tag" to={`/stats-v2-alpha/${period}/Player/${player.name}`}>{player.name}</Link>
                    {player.pronouns && <div className="ranking-row__name--pronouns">({player.pronouns})</div>}
                </div>
                <div className="ranking-row__name--bottom">
                    {character && <img src={require(`../../_assets/stockIcons/${character}.png`)} alt="" className="ranking-row__name--icon ranking-row__name--character" />}
                    <a href={`https://twitter.com/${player.twitterUsername}`} className="social-link">
                        {player.twitterUsername && <FaTwitter className="ranking-row__name--icon" />}
                    </a>
                    <a href={`https://twitch.tv/${player.twitchUsername}`} className="social-link">
                        {player.twitchUsername && <FaTwitch className="ranking-row__name--icon" />}
                    </a>
                </div>
            </div>

            <div className="ranking-row__item ranking-row__rating">{player.conservativeRating.toFixed(0)}</div>
            <div className="ranking-row__item ranking-row__winloss">{`${player.wins} - ${player.losses} (${winPercent.toFixed(0)}%)`}</div>
            <div className="ranking-row__item ranking-row__pr-events">{player.prEvents}</div>

            <div className="ranking-row__item ranking-row__last-tournament">
                <a href={`http://start.gg/${data.event.slug}`}  target="_blank" rel="noreferrer">{tournamentName}</a>
                <span>{`${data.placingString} of ${data.event.numEntrants}`}</span>
                <span className="ranking-row__last-tournament--date">{date.toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default RankingRow;