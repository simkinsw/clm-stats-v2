import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillPersonFill, BsFillHouseFill, BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import PeriodSelector from "./PeriodSelector";

/*
    TODO: 
    - new icon for CLM Stats
    - animate clicking on the links
    - effect when clicking on search
    - Current page effect doesn't work consistently
    - remove underline transition out (underline just disappears)
*/

function TopNav() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const period = location.pathname.split("/")[2];

    function sendSearch() {
        if (!searchText) return;
        navigate(`/stats-v2-alpha/${period}/player/${searchText}`);
        setSearchText("");
    }

    const currentPage = location.pathname.split("/")[3] ?? "home";

    return (
        <nav className="menu">
            <ul className="top-nav">
                <TopNavItem text="CLM Stats" path={`/stats-v2-alpha/${period}`} active={currentPage==="home"} icon={<BsFillHouseFill className="top-nav__icon" />} />
                <TopNavItem text="Players" path={`/stats-v2-alpha/${period}/player/${searchText !== "" ? searchText : "search"}`} active={currentPage==="player"} icon={<BsFillPersonFill className="top-nav__icon" />} />
                <TopNavItem text="Compare" path={`/stats-v2-alpha/${period}/compare/${searchText}/`} active={currentPage==="compare"} icon={<BsPeopleFill className="top-nav__icon" />} />
                <TopNavItem text="PR Candidates" path={`/stats-v2-alpha/${period}/pr`} active={currentPage==="pr"} icon={<BsFillBarChartFill className="top-nav__icon" />} />
                {/*<TopNavItem text="Tournaments" path={`/stats-v2-alpha/${period}/tournament`} icon={<FaTrophy className="top-nav__icon" />} />*/}
            </ul>

            <PeriodSelector />

            <form action="#" className="search" onSubmit={() => sendSearch()}>
                <input type="text" className="search__input" placeholder="Search players..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Link to={`/stats-v2-alpha/${period}/player/${searchText}`}><HiOutlineSearch className="search__icon" /></Link>
            </form>
        </nav>
    );
}

function TopNavItem({ text, path, icon, active }: { text: string, path: string, active: boolean, icon?: JSX.Element }) {
    return (
        <Link to={path}>
            <li className={"top-nav__item top-nav__item--" + active}>
                <div className="top-nav__link">
                    {icon}
                    <span>{text}</span>
                </div>
            </li>
        </Link>
    );
}

export default TopNav;