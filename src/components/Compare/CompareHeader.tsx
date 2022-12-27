import { FaTwitch, FaTwitter } from "react-icons/fa";
import { HomepageEntry } from "../../types/homepageData";

type CompareHeaderProps = {
    p1Data: HomepageEntry;
    p2Data: HomepageEntry;
}

function CompareHeader({ p1Data, p2Data }: CompareHeaderProps) {

    return (
        <div className="compare-header">
            <div className="compare-header__player compare-header__player--1">
                <CompareHeaderText data={p1Data} />
                <img src={p1Data.player.profileImage} alt="" className="compare-header__avatar" />
            </div>
            <div className="compare-header__vs">
                vs.
            </div>
            <div className="compare-header__player compare-header__player--2">
                <img src={p2Data.player.profileImage} alt="" className="compare-header__avatar" />
                <CompareHeaderText data={p2Data} />
            </div>
        </div>
    );
}

function CompareHeaderText({ data }: { data: HomepageEntry }) {

    return (
        <div className="compare-header__text">
            <div className="compare-header__tag">{data.player.name}</div>
            <div className="compare-header__name">{data.player.realName}</div>
            <div className="compare-header__socials">
                {data.player.twitterUsername && 
                <a href={`https://twitter.com/${data.player.twitterUsername}`} className="compare-header__socials-link">
                    <FaTwitter className="compare-header__socials--icon" />
                    <span className="compare-header__socials--handle">{data.player.twitterUsername}</span> 
                </a>}
                &nbsp;&nbsp;&nbsp;
                {data.player.twitchUsername && 
                <a href={`https://twitch.tv/${data.player.twitchUsername}`} className="compare-header__socials-link">
                    <FaTwitch className="compare-header__socials--icon" />
                    <span className="compare-header__socials--handle">{data.player.twitchUsername}</span> 
                </a>}
            </div>
        </div>
    );
}

export default CompareHeader;