import { TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { SortProps } from "../../types/sortProps";

type RankingHeaderProps = {
    sortProps: SortProps
    setSort: (sortKey: string, sortDir: number) => void
}
function RankingHeader({ sortProps, setSort }: RankingHeaderProps) {
    return (
        <div className="ranking-header">
            <Header text={"Rank"} num={1} myKey={"rating"} sortProps={sortProps} setSort={setSort} />
            <Header text={"Player"} num={2} myKey={"name"} sortProps={sortProps} setSort={setSort} />
            <Header text={"Rating"} num={3} myKey={"rating"} sortProps={sortProps} setSort={setSort} />
            <Header text={"W - L (%)"} num={4} myKey={"winrate"} sortProps={sortProps} setSort={setSort} /> 
            <Header text={"PR Events"} num={5} myKey={"prEvents"} sortProps={sortProps} setSort={setSort} /> 
            <Header text={"Last Event"} num={6} myKey={"tournament"} sortProps={sortProps} setSort={setSort} />
        </div>
    );
}

function Header({ text, num, myKey, sortProps, setSort } : { text: string, num: number, myKey: string, sortProps: SortProps, setSort: (a: string, b: number) => void }) {
    const { sortKey, sortDir } = sortProps;
    
    function onClick() {
        if(sortKey === myKey) {
            setSort(myKey, sortDir*-1);
        } else {
            setSort(myKey, -1);
        }
    }
    
    return (
        <span className={"ranking-header__entry ranking-header__" + num} onClick={onClick}>
            {text}
            {myKey !== sortKey ? <TiArrowUnsorted className="ranking-header__sort-arrow" /> : sortDir === 1 ? <TiArrowSortedUp className="ranking-header__sort-arrow" /> : <TiArrowSortedDown className="ranking-header__sort-arrow" />}
        </span>
    )
}

export default RankingHeader;