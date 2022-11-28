import { HomepageEntry } from "../types/homepageData";
import { FaTwitter, FaTwitch } from "react-icons/fa";
import playerData from "../_data/player-data.json";
import { AdditionalPlayerData } from "../types/player";

type PlayerHeaderProps = {
    player: HomepageEntry
}

function PlayerHeader({ player }: PlayerHeaderProps) {

    const additionalPlayerData = new Map(Object.entries(playerData)) as AdditionalPlayerData;

    let character: string | undefined = undefined;
    let summerRank = "unranked";
    if(additionalPlayerData.has(player.player.name)) {
        character = additionalPlayerData.get(player.player.name)!.character;
        summerRank = additionalPlayerData.get(player.player.name)!.summerRank + "";
    }

    return (
        <section className="player-header">
            <div className="player-header__info">
                <div className="player-header__avatar">
                    <img src={player.player.profileImage} alt="Profile Picture" className="player-header__avatar--image" />
                </div>

                <div className="player-header__text">
                    <h1 className="player-header__text--top">
                        {!!player.player.prefix && <span className="player-header__text--prefix">{player.player.prefix}</span>}
                        <span className="player-header__text--tag">{player.player.name}</span>
                    </h1>
                    <h2 className="player-header__text--bottom">
                        <span className="player-header__text--name">{player.player.realName}</span>
                        {player.player.pronouns && <span className="player-header__text--pronouns">{`(${player.player.pronouns})`}</span>}
                    </h2>
                    <h2 className="player-header__text--socials">
                        <a href={`https://twitter.com/${player.player.twitterUsername}`} className="social-link">
                            <FaTwitter />
                            <span className="player-header__text--twitter">{player.player.twitterUsername}</span>
                        </a>
                        <a href={`https://twitch.tv/${player.player.twitchUsername}`} className="social-link">
                            <FaTwitch style={{transform: "translateY(.3rem)"}} /> 
                            <span className="player-header__text--twitch">{player.player.twitchUsername}</span>
                        </a>
                    </h2>
                </div>

                <div className="player-header__stats">
                    <HeaderStat name="Rank" value={player.rank} />
                    <HeaderStat name="Win-Loss" value={`${player.player.wins} - ${player.player.losses}`} />
                    <HeaderStat name="PR Events" value={player.player.prEvents} />
                    <HeaderStat name="Summer Rank" value={summerRank} />
                </div>

                {/*TODO Add more Portraits*/}
                { !!character && <img src={require(`../_assets/portraits/${character}.png`)} alt="" className="player-header__portrait" />}
            </div>

            {/*something about the season boundary */}
        </section>
    )
}

function HeaderStat( { name, value } : { name: string, value: string | number }) {
    return (
        <div className="player-header__stat">
            <div className="player-header__stat--name">{name}</div>
            <div className="player-header__stat--value">{value}</div>
        </div>
    )
}

export default PlayerHeader;

