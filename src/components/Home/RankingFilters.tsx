import { useRef, useState } from "react";
import { FilterKeys } from "../../types/sortProps";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineFilterList } from "react-icons/md";
import PeriodSelector from "../PeriodSelector";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

function RankingFilters({ toggleFilter }: { toggleFilter: (filter: keyof typeof FilterKeys) => void} ) {
    return (
        <div className="ranking-filters">
            <div className="ranking-filters__heading">Filters:</div>
            <PeriodSelector />
            <Filter toggleFilter={toggleFilter} />
        </div>
    );
}

export default RankingFilters;

function Filter({ toggleFilter }: { toggleFilter: (filter: keyof typeof FilterKeys) => void}) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setDropdownVisible(false));

    const toggleVisibility = () => {
        setDropdownVisible(!dropdownVisible);
    }

    return (
        <div ref={wrapperRef} className="filter__container">
            <div className={`filter__box filter__box--${dropdownVisible}`} onClick={toggleVisibility}>
                <MdOutlineFilterList className="filter__icon" />
            </div>
            {dropdownVisible &&
            <div className="filter__dropdown">
                <Checkbox text="Hide Out of Region Players" filterKey="region" toggleFilter={toggleFilter} />
                <Checkbox text="Hide Unranked Players" filterKey="ranked" toggleFilter={toggleFilter} />
            </div>
            }
        </div>
    )
}



function Checkbox({ text, filterKey, toggleFilter }: { text: string, filterKey: keyof typeof FilterKeys, toggleFilter: (filter: keyof typeof FilterKeys) => void }) {
    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked);
        toggleFilter(filterKey);
    }

    return (
        <div className="filter__option" onClick={handleClick}>
            <span className="filter__option--label">{text}</span>
            {checked ? <MdOutlineCheckBox className="filter__option--checkbox" /> : <MdOutlineCheckBoxOutlineBlank className="filter__option--checkbox" />}
        </div>
    )
}