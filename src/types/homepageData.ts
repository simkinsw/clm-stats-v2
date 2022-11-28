import { Event } from "./event";
import { Player } from "./player";

export type HomepageEntry = {
    rank: number;
    player: Player;
    winrate: number;
    event: Event;
    placing: number;
    placingString: string;
};

export type HomepageData = HomepageEntry[];