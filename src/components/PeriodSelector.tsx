import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

const dropdownText: Map<string, string> = new Map([
    ["2", "2022 Spring"],
    ["3", "2022 Summer"],
    ["4", "2022 Fall"],
    ["5", "2023 Winter"]
])

function PeriodSelector() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [active, setActive] = useState(true);
    const [period, setPeriod] = useState<string>();
    const ref = useRef(null);
    useOutsideAlerter(ref, handleClickOutside);

    useEffect(() => {
        if (!searchParams.get("period")) {
            setSearchParams({ period: process.env.REACT_APP_DEFAULT_PERIOD! });
        }
        setPeriod(searchParams.get("period")!);
    }, [searchParams, setSearchParams]);

    function onClick(period: string) {
        setActive(false);
        setSearchParams({ period })
    }

    function handleClickOutside() {
        setActive(false);
    }

    return (
        <div ref={ref} className="period-select__container">
            <div className={`period-select__icon period-select__icon--${active}`} 
                onClick={() => setActive(!active)}
            >
                <span className="period-select__text">{dropdownText.get(period!)} <FaChevronDown className="period-select__chevron" /></span>
                {
                    active && 
                    <div className="period-select__dropdown">
                        {period !== "2" && <div className="period-select__option" onClick={() => onClick("2")}>2022 Spring</div>}
                        {period !== "3" &&<div className="period-select__option" onClick={() => onClick("3")}>2022 Summer</div>}
                        {period !== "4" &&<div className="period-select__option" onClick={() => onClick("4")}>2022 Fall</div>}
                        {period !== "5" &&<div className="period-select__option" onClick={() => onClick("5")}>2023 Winter</div>}
                    </div>
                }
            </div>
        </div>
    )
}

export default PeriodSelector;