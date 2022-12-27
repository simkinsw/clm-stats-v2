import { useEffect, useState } from "react"
import { H2hData } from "../types/h2hData";
import { HomepageData, HomepageEntry } from "../types/homepageData"
import { TournamentData } from "../types/tournamentData";


export function useFetchHomepage(prPeriod: string){
    const [data, setData] = useState<HomepageData>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (homepageCache.has(prPeriod)) {
            setData(homepageCache.get(prPeriod));
            setLoading(false);
        }

        try {
            setLoading(true);
            fetch(`https://storage.googleapis.com/chicago_2022-${prPeriod}/homepage.json`)
                .then(response => response.json())
                .then((responseJSON: HomepageData) => {
                    setData(responseJSON.filter((entry) => !entry.player.name.includes("BYE")));
                    homepageCache.set(prPeriod, responseJSON);
                });
        } catch(err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [prPeriod]);

    return { data, error, loading };
}

const homepageCache = new Map<string, HomepageData>();

export function useFetchHomepageEntry(player: string, prPeriod: string) {
    const [data, setData] = useState<HomepageEntry>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const locatePlayer = () => {
            const homepageEntry = homepageCache.get(prPeriod)!.find((value) => value.player.name === player);
            if(homepageEntry) {
                setData(homepageEntry);
                homepageEntryCache.set(player + prPeriod, homepageEntry);
            } else {
                setError(new Error("Player not found"));
            }
            setLoading(false);
        }

        if (homepageEntryCache.has(player + prPeriod)) {
            setData(homepageEntryCache.get(player + prPeriod));
            setLoading(false);
            return;
        } else if (homepageCache.has(prPeriod)) {
            locatePlayer();
            return;
        }

        try {
            setLoading(true);
            fetch(`https://storage.googleapis.com/chicago_2022-${prPeriod}/homepage.json`)
                .then(response => response.json())
                .then((responseJSON: HomepageData) => {
                    homepageCache.set(prPeriod, responseJSON);
                    locatePlayer();
                });
        } catch(err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [player, prPeriod, data]);

    return { data, error, loading };
}

const homepageEntryCache = new Map<string, HomepageEntry>();

export function useFetchPlayerH2hs(player: string, prPeriod: string) {
    const [data, setData] = useState<H2hData>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (h2hCache.has(player + prPeriod)) {
            setData(h2hCache.get(player + prPeriod));
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            fetch(`https://storage.googleapis.com/chicago_2022-${prPeriod}/${player.replace('?', '')}-h2hs.json`)
                .then(response => response.json())
                .then((responseJSON: H2hData) => { 
                    setData(responseJSON);
                    h2hCache.set(player + prPeriod, responseJSON);
                });
        } catch(err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [player, prPeriod, data]);

    return { data, error, loading };
}

const h2hCache = new Map<string, H2hData>();

export function useFetchPlayerTournaments(player: string, prPeriod: string) {
    const [data, setData] = useState<TournamentData>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tournamentCache.has(player + prPeriod)) {
            setData(tournamentCache.get(player + prPeriod));
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            fetch(`https://storage.googleapis.com/chicago_2022-${prPeriod}/${player.replace('?', '')}-tournaments.json`)
                .then(response => response.json())
                .then((responseJSON: TournamentData) => {
                    setData(responseJSON);
                    tournamentCache.set(player + prPeriod, responseJSON);
                });
        } catch(err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [player, prPeriod, data]);

    return { data, error, loading };
}


const tournamentCache = new Map<string, TournamentData>();