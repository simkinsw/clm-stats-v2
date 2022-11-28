export type Event = {
    id: number;
    name: string;
    numEntrants: number;
    date: number;
    slug: string;
    prEligible: boolean;
    tournamentName: string;
    dateString: string; //TODO: this doesn't work
    url: string; //TODO: this doesn't work
    imageUrl: string;
    placement: number; //TODO: does this work?
}