import { Event } from "./event";
import { SetInfo } from "./h2hData";

export type Tournament = {
    event: Event;
    placingString: string;
    setSummaries: SetInfo[];
    numWins: number;
    numLosses: number;
    losses: string[];
    DQ: boolean;
};

export type TournamentData = Tournament[];
