import { useEffect, useState } from "react"
import { H2hData } from "../types/h2hData";
import { HomepageData } from "../types/homepageData"
import { TournamentData } from "../types/tournamentData";


export function useFetchHomepage(prPeriod: number){

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
                    setData(responseJSON);
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

const homepageCache = new Map<number, HomepageData>();

export function useFetchPlayerH2hs(player: string, prPeriod: number) {
    const [data, setData] = useState<H2hData>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (h2hCache.has(player + prPeriod)) {
            setData(h2hCache.get(player + prPeriod));
            setLoading(false);
        }

        try {
            setLoading(true)
            fetch(`https://storage.googleapis.com/chicago_2022-${prPeriod}/${player.replace('?', '')}-h2hs.json`)
                .then(response => response.json())
                .then((responseJSON: H2hData) => { 
                    setData(responseJSON);
                    h2hCache.set(player + prPeriod, data!);
                });
        } catch(err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [player, prPeriod]);

    return { data, error, loading };
}

const h2hCache = new Map<string, H2hData>();

export function useFetchPlayerTournaments(player: string, prPeriod: number) {
    const [data, setData] = useState<TournamentData>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tournamentCache.has(player + prPeriod)) {
            setData(tournamentCache.get(player + prPeriod));
            setLoading(false);
        }

        try {
            setLoading(true);
            fetch(`https://storage.googleapis.com/chicago_2022-${prPeriod}/${player.replace('?', '')}-tournaments.json`)
                .then(response => response.json())
                .then((responseJSON: TournamentData) => {
                    setData(responseJSON);
                    tournamentCache.set(player + prPeriod, data!);
                });
        } catch(err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [player, prPeriod]);

    return { data, error, loading };
}


const tournamentCache = new Map<string, TournamentData>();