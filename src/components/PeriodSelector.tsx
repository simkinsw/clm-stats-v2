import { useLocation, useNavigate, useParams } from "react-router-dom";

function PeriodSelector() {
    return (
        <div className="period-select__container">
            <PeriodSelectIcon text="2022 Spring" period="2" />
            <PeriodSelectIcon text="2022 Summer" period="3" />
            <PeriodSelectIcon text="2022 Fall" period="4" />
            <PeriodSelectIcon text="2023 Winter" period="5" />
        </div>
    )
}

function PeriodSelectIcon({ text, period }: { text: string, period: string }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { period: curPeriod } = useParams();

    function onClick(newPeriod: string) {
        const suffix = location.pathname.split("/").slice(3).join("/");
        navigate(`/stats-v2-alpha/${newPeriod}/${suffix}`);
    }

    return (
        <div className={`period-select__icon period-select__icon--${period === curPeriod}`} onClick={() => onClick(period)}>
            {text}
        </div>
    )
}


export default PeriodSelector;