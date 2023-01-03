import { FaTwitch, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HomepageEntry } from "../../types/homepageData";

type CompareHeaderProps = {
    p1Data: HomepageEntry;
    p2Data: HomepageEntry;
    period: string;
}

function CompareHeader({ p1Data, p2Data, period }: CompareHeaderProps) {

    return (
        <div className="compare-header">
            <div className="compare-header__player compare-header__player--1">
                <CompareHeaderText data={p1Data} period={period} />
                <img src={p1Data.player.profileImage} alt="" className="compare-header__avatar" />
            </div>
            <div className="compare-header__vs">
                vs.
            </div>
            <div className="compare-header__player compare-header__player--2">
                <img src={p2Data.player.profileImage} alt="" className="compare-header__avatar" />
                <CompareHeaderText data={p2Data} period={period} />
            </div>
        </div>
    );
}

function CompareHeaderText({ data, period }: { data: HomepageEntry, period: string }) {
    return (
        <div className="compare-header__text">
            <Link to={`/stats-v2-alpha/${period}/player/${data.player.name}`}><div className="compare-header__tag">{data.player.name}</div></Link>
            <div className="compare-header__name">{data.player.realName}</div>
            <div className="compare-header__socials">
                {data.player.twitterUsername && 
                <a href={`https://twitter.com/${data.player.twitterUsername}`} className="compare-header__socials-link" target="_blank" rel="noopener">
                    <FaTwitter className="compare-header__socials--icon" />
                    <span className="compare-header__socials--handle">{data.player.twitterUsername}</span> 
                </a>}
                &nbsp;&nbsp;&nbsp;
                {data.player.twitchUsername && 
                <a href={`https://twitch.tv/${data.player.twitchUsername}`} className="compare-header__socials-link" target="_blank" rel="noopener">
                    <FaTwitch className="compare-header__socials--icon" />
                    <span className="compare-header__socials--handle">{data.player.twitchUsername}</span> 
                </a>}
            </div>
        </div>
    );
}

export default CompareHeader;