import { useRef, useState } from "react";
import { FilterKeys, filters } from "../../types/sortProps";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineFilterList } from "react-icons/md";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

function RankingFilters({ toggleFilter, filters }: { filters: filters, toggleFilter: (filter: keyof typeof FilterKeys) => void} ) {
    return (
        <div className="ranking-filters">
            <Filter filters={filters} toggleFilter={toggleFilter} />
        </div>
    );
}

export default RankingFilters;

function Filter({ toggleFilter, filters }: { filters: filters, toggleFilter: (filter: keyof typeof FilterKeys) => void}) {
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
                <Checkbox 
                    text="Hide Out of Region Players" 
                    filterKey="region" 
                    checked={filters.region}
                    toggleFilter={toggleFilter} 
                />
                <Checkbox 
                    text="Hide Unranked Players" 
                    filterKey="ranked" 
                    checked={filters.ranked}
                    toggleFilter={toggleFilter} 
                />
            </div>
            }
        </div>
    )
}



function Checkbox({ text, filterKey, toggleFilter, checked }: { text: string, filterKey: keyof typeof FilterKeys, checked: boolean, toggleFilter: (filter: keyof typeof FilterKeys) => void }) {
    function handleClick() {
        toggleFilter(filterKey);
    }

    return (
        <div className="filter__option" onClick={handleClick}>
            <span className="filter__option--label">{text}</span>
            {checked ? <MdOutlineCheckBox className="filter__option--checkbox" /> : <MdOutlineCheckBoxOutlineBlank className="filter__option--checkbox" />}
        </div>
    )
}