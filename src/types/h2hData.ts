export type H2hEntry = {
    opponent: string;
    rank: number;
    sets: Set[];
};

export type Set = {
    setInfo: SetInfo;
    tournamentName: string;
    date: string;
    slug: string;
}

export type H2hData = Array<H2hEntry | undefined>;

export type SetInfo = {
    won: boolean;
    dq: boolean;
    round: string;
    wonGames: string;
    lostGames: string;
    opponentName: string;
    winnerName: string;
    loserName: string;
};