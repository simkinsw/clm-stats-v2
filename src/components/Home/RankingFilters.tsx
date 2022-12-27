import { useState } from "react";
import { FilterKeys } from "../../types/sortProps";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import PeriodSelector from "../PeriodSelector";

function RankingFilters({ toggleFilter }: { toggleFilter: (filter: keyof typeof FilterKeys) => void} ) {
    return (
        <div className="ranking-filters">
            <div className="ranking-filters__heading">Filters:</div>
            <Checkbox text="Hide Out of Region Players" filterKey="region" toggleFilter={toggleFilter} />
            <Checkbox text="Hide Unranked Players" filterKey="ranked" toggleFilter={toggleFilter} />
            <PeriodSelector />
        </div>
    );
}

export default RankingFilters;


function Checkbox({ text, filterKey, toggleFilter }: { text: string, filterKey: keyof typeof FilterKeys, toggleFilter: (filter: keyof typeof FilterKeys) => void }) {
    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked);
        toggleFilter(filterKey);
    }

    return (
        <div className="ranking-filters__filter" onClick={handleClick}>
            {checked ? <MdOutlineCheckBox className="ranking-filters__checkbox" /> : <MdOutlineCheckBoxOutlineBlank className="ranking-filters__checkbox" />}
            <span className="ranking-filters__label">{text}</span>
        </div>
    )
}