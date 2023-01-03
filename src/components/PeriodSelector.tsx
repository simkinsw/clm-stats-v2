import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { RefObject } from 'react'
import { useEventListener } from 'usehooks-ts'

const dropdownText: Map<string, string> = new Map([
    ["2", "2022 SPRING"],
    ["3", "2022 SUMMER"],
    ["4", "2022 FALL"],
    ["5", "2023 WINTER"]
])

function PeriodSelector() {
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(true);
    const [period, setPeriod] = useState<string>();
    const ref = useRef(null);
    useOnClickOutside(ref, handleClickOutside);

    useEffect(() => {
        setActive(false);
        setPeriod(location.pathname.split("/")[2]);
    }, [location])

    function onClick(newPeriod: string) {
        const suffix = location.pathname.split("/").slice(3).join("/");
        setActive(false);
        navigate(`/stats-v2-alpha/${newPeriod}/${suffix}`);
    }

    function handleClickOutside() {
        setActive(false);
    }

    return (
        <div ref={ref} className="period-select__container">
            <div className={`period-select__icon period-select__icon--${active}`} 
                onClick={() => setActive(!active)}
            >
                <span className="period-select__text">{dropdownText.get(period ?? "4")} <FaChevronDown className="period-select__chevron" /></span>
                {
                    active && 
                    <div className="period-select__dropdown">
                        <div className="period-select__option" onClick={() => onClick("2")}>2022 SPRING</div>
                        <div className="period-select__option" onClick={() => onClick("3")}>2022 SUMMER</div>
                        <div className="period-select__option" onClick={() => onClick("4")}>2022 FALL</div>
                        <div className="period-select__option" onClick={() => onClick("5")}>2023 WINTER</div>
                    </div>
                }
            </div>
        </div>
    )
}

type Handler = (event: MouseEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, event => {
    const el = ref?.current

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return
    }

    handler(event)
  })
}

export default PeriodSelector;