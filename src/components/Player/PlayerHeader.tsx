import { HomepageEntry } from "../../types/homepageData";
import { FaTwitter, FaTwitch } from "react-icons/fa";
import DefaultPlayerHeader from "./DefaultPlayerHeader";

type PlayerHeaderProps = {
    player: HomepageEntry | undefined,
    period: string
}

function PlayerHeader({ player, period }: PlayerHeaderProps) {

    if (!player) return <DefaultPlayerHeader period={period} />

    return (
        <header className="player-header">
            <div className="player-header__info">
                <div className="player-header__avatar">
                    <img src={player.player.profileImage} alt="Avatar" className="player-header__avatar--image" />
                </div>

                <div className="player-header__text">
                    <div className="player-header__text--top">
                        {!!player.player.prefix && <span className="player-header__text--prefix">{player.player.prefix}</span>}
                        <span className="player-header__text--tag">{player.player.name}</span>
                    </div>
                    <div className="player-header__text--bottom">
                        <span className="player-header__text--name">{player.player.realName}</span>
                        {player.player.pronouns && <span className="player-header__text--pronouns">{`(${player.player.pronouns})`}</span>}
                    </div>
                    <div className="player-header__text--socials">
                        {player.player.twitterUsername &&
                        <a href={`https://twitter.com/${player.player.twitterUsername}`} className="social-link" target="_blank" rel="noopener">
                            <FaTwitter className="player-header__icon" />
                            <span className="player-header__text--twitter">{player.player.twitterUsername}</span>
                        </a>}
                        {player.player.twitchUsername &&
                        <a href={`https://twitch.tv/${player.player.twitchUsername}`} className="social-link" target="_blank" rel="noopener">
                            <FaTwitch className="player-header__icon" style={{transform: "translateY(.3rem)"}} /> 
                            <span className="player-header__text--twitch">{player.player.twitchUsername}</span>
                        </a>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PlayerHeader;

