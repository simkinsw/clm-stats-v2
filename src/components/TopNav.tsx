import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillPersonFill, BsFillHouseFill, BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";

/*
    TODO: 
    - new icon for CLM Stats
    - animate clicking on the links
    - effect when clicking on search
    - Current page effect doesn't work for Player pages
    - remove underline transition out (underline just disappears)
*/

function TopNav() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const period = location.pathname.split("/")[2];

    function sendSearch() {
        navigate(`/stats-v2-alpha/${period}/player/${searchText}`);
        setSearchText("");
    }

    return (
        <nav className="menu">
            <ul className="top-nav">
                <TopNavItem text="CLM Stats" path={`/stats-v2-alpha/${period}`} icon={<BsFillHouseFill className="top-nav__icon" />} />
                <TopNavItem text="Players" path={`/stats-v2-alpha/${period}/player/${searchText}`} icon={<BsFillPersonFill className="top-nav__icon" />} />
                <TopNavItem text="Compare" path={`/stats-v2-alpha/${period}/compare/${searchText}/`} icon={<BsPeopleFill className="top-nav__icon" />} />
                <TopNavItem text="PR Voting" path={`/stats-v2-alpha/${period}/pr`} icon={<BsFillBarChartFill className="top-nav__icon" />} />
                <TopNavItem text="Tournaments" path={`/stats-v2-alpha/${period}/tournament`} icon={<FaTrophy className="top-nav__icon" />} />
            </ul>

            <form action="#" className="search" onSubmit={() => sendSearch()}>
                <input type="text" className="search__input" placeholder="Search players..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Link to={`/stats-v2-alpha/${period}/player/${searchText}`}><HiOutlineSearch className="search__icon" /></Link>
            </form>
        </nav>
    );
}

//TODO: All the same width
function TopNavItem({ text, path, icon }: { text: string, path: string, icon?: JSX.Element }) {
    const location = useLocation();

    return (
        <Link to={path}>
            <li className={"top-nav__item top-nav__item--" + (location.pathname === path)}>
                <div className="top-nav__link">
                    {icon}
                    <span>{text}</span>
                </div>
            </li>
        </Link>
    );
}

export default TopNav;