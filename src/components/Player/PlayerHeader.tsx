import { HomepageEntry } from "../../types/homepageData";
import { FaTwitter, FaTwitch } from "react-icons/fa";

type PlayerHeaderProps = {
    player: HomepageEntry
}

function PlayerHeader({ player }: PlayerHeaderProps) {

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
                        <a href={`https://twitter.com/${player.player.twitterUsername}`} className="social-link">
                            <FaTwitter className="player-header__icon" />
                            <span className="player-header__text--twitter">{player.player.twitterUsername}</span>
                        </a>
                        <a href={`https://twitch.tv/${player.player.twitchUsername}`} className="social-link">
                            <FaTwitch className="player-header__icon" style={{transform: "translateY(.3rem)"}} /> 
                            <span className="player-header__text--twitch">{player.player.twitchUsername}</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PlayerHeader;

