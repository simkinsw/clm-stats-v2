import { useMemo, useState } from "react";
import RankingFilters from "./RankingFilters";
import RankingHeader from "./RankingHeader";
import RankingRow from "./RankingRow";
import { HomepageData, HomepageEntry } from "../../types/homepageData";
import { FilterKeys, startingFilters, startingSortProps } from "../../types/sortProps";
import outOfRegion from "../../_data/outOfRegion.json";

type RankingProps = {
    period: string,
    data: HomepageData
}
function Ranking({ period, data }: RankingProps) {
    const [sortProps, setSortProps] = useState(startingSortProps);
    const [filters, setFilters] = useState(startingFilters);
    const [rows, setRows] = useState<HomepageData>(data);

    function setSort(sortKey: string, sortDir: number) {
        setSortProps({ sortKey, sortDir });
    }

    function toggleFilter(key: keyof typeof FilterKeys) {
        const filtersClone = { ...filters };
        filtersClone[key] = !filtersClone[key];
        setFilters(filtersClone);
    }

    useMemo(() => {
        const filtered = filter(data);
        const sorted = sort(filtered);
        setRows(sorted);

        function filter(data: HomepageEntry[]) {
            let filtered = data.slice();
            if(filters.ranked) {
                filtered = filtered.filter((entry) => entry.player.prEvents >= parseInt(process.env.REACT_APP_PR_EVENT_ELIGIBILITY!));
            }
            if (filters.region) {
                filtered = filtered.filter((entry) => !outOfRegion.includes(entry.player.name));
            }
            return filtered;
        }

        function sort(rows: HomepageEntry[]) {
            if (sortProps.sortKey === "rating") {
                return rows.sort((a,b) => (a.player.conservativeRating - b.player.conservativeRating) * sortProps.sortDir);
            } else if (sortProps.sortKey === "winrate") {
                return rows.sort((a,b) => ((a.player.wins/(a.player.wins + a.player.losses)) - (b.player.wins/(b.player.wins + b.player.losses))) * sortProps.sortDir);
            } else if (sortProps.sortKey === "prEvents") {
                return rows.sort((a,b) => (a.player.prEvents - b.player.prEvents) * sortProps.sortDir);
            } else if (sortProps.sortKey === "tournament") {
                return rows.sort((a,b) => (a.event.date - b.event.date) * sortProps.sortDir);
            } else if (sortProps.sortKey === "name") {
                return rows.sort((a,b) => {
                    if (a.player.name.toLowerCase() < b.player.name.toLowerCase()) {
                        return sortProps.sortDir;
                    } else {
                        return -sortProps.sortDir;
                    }
                });
            } else {
                return rows;
            }
        }
    }, [sortProps, filters, data])

    return (
        <div className="homepage-view">
            <div className="homepage-content">
                <div className="ranking-container">
                    <RankingFilters toggleFilter={toggleFilter} filters={filters} />
                    <RankingHeader sortProps={sortProps} setSort={setSort} />
                    {rows && rows.map((entry, rank) => <RankingRow data={entry} period={period} rank={sortProps.sortDir === -1 ? rank + 1 : rows.length - rank} key={rank} />)}
                </div>
            </div>
        </div>
    );
}

export default Ranking;