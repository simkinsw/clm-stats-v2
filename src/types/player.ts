import { Event } from "./event";

//TODO: lots of duplicate info here
export type Player = {
    id: number;
    name: string;
    profileImage: string;
    pronouns: string;
    glicko2: Rating;
    prEvents: number;
    wins: number;
    losses: number;
    rating: number;
    deviation: number;
    volatility: number;
    conservativeRating: number;
    ranked: boolean;
    winrate: number;
    event: Event;
    placing: number;
    placingString: string;
    realName: string;
    twitterUsername: string;
    twitchUsername: string;
    prefix: string;
}

//TODO: this doesn't really seem necessary on top of the rating info included above
export type Rating = {
    rating: number;
    ratingDeviation: number;
    volatility: number;
    oppMus: number[];
    oppPhis: number[];
    results: any[];
    v: number;
    delta: number;
}

type manualPlayerData = {
    character: string;
    summerRank: number;
}

export type AdditionalPlayerData = Map<String, manualPlayerData>; 