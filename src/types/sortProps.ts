export type SortProps = {
    sortKey: string,
    sortDir: number,
}

export const startingSortProps: SortProps = {
    sortKey: "rating",
    sortDir: -1,
}

export type filters = {
    region: boolean,
    ranked: boolean
}

export const startingFilters = {
    region: false,
    ranked: false
}

export enum FilterKeys {
    region = "region",
    ranked = "ranked"
}