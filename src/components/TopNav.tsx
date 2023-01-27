import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BsFillPersonFill, BsFillHouseFill, BsPeopleFill } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import PeriodSelector from "./PeriodSelector";

/*
    TODO: 
    - new icon for CLM Stats
    - Change the way Period is stored in the url (query string?)
    - Current page effect doesn't work for Player pages
*/

function TopNav() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const [queryParams] = useSearchParams();
    const period = queryParams.get("period");

    function sendSearch() {
        if (!searchText) return;
        navigate(`/stats-v2-alpha/player/${searchText}/?period=${period}`);
        setSearchText("");
    }

    const currentPage = location.pathname.split("/")[3] ?? "home";

    return (
        <nav className="menu">
            <ul className="top-nav">
                <TopNavItem text="CLM Stats" path={`/stats-v2-alpha/?period=${period}`} active={currentPage==="home"} icon={<BsFillHouseFill className="top-nav__icon" />} />
                <TopNavItem text="Players" path={`/stats-v2-alpha/player/${searchText !== "" ? searchText : "search"}/?period=${period}`} active={currentPage==="player"} icon={<BsFillPersonFill className="top-nav__icon" />} />
                <TopNavItem text="Compare" path={`/stats-v2-alpha/compare/${searchText}/?period=${period}`} active={currentPage==="compare"} icon={<BsPeopleFill className="top-nav__icon" />} />
                {/*
                <TopNavItem text="PR Voting" path={`/stats-v2-alpha/${period}/pr`} icon={<BsFillBarChartFill className="top-nav__icon" />} />
                <TopNavItem text="Tournaments" path={`/stats-v2-alpha/${period}/tournament`} icon={<FaTrophy className="top-nav__icon" />} />
                */}
            </ul>

            <form action="#" className="search" onSubmit={sendSearch}>
                <input type="text" className="search__input" placeholder="Search players..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <HiOutlineSearch onClick={sendSearch} className="search__icon" />
            </form>
            <PeriodSelector />
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