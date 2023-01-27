import { Link } from "react-router-dom";

function DefaultPlayerHeader({ period }: { period: string }) {
    return (
        <header className="player-header">
            <div className="player-header__info">
                <div className="player-header__avatar">
                    <img src="https://storage.googleapis.com/chicago_2022-2/CLM_Logo_Avatar_Placeholder.png" alt="Avatar" className="player-header__avatar--image" />
                </div>

                <div className="player-header__text">
                    <div className="player-header__text--top">
                        <span className="player-header__text--tag"></span>
                    </div>
                    <div className="player-header__text--bottom">
                        <span className="player-header__text--name"></span>
                    </div>
                </div>
            </div>
            <div className="player-header__not-found">
                No valid player selected. Use the search at the top right to find a player or <Link to={`/stats-v2-alpha/${period}`}>
                    <span className="player-header__home-link">return home</span>
                </Link>.
            </div>
        </header>
    )
}

export default DefaultPlayerHeader;