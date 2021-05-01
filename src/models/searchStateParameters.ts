export type SearchStateParameters = {
    searchBy: string,
    searchTerm?: string,
    total?: number;
    pageSize?: number;
    numberOfPages?: number;
    currentPage: number | undefined,
    nextPage?: number,
    nextPageUrl?: string | null,
    previousPage?: number,
}