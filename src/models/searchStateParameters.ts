export type SearchStateParameters = {
    searchBy: string,
    searchTerm?: string,
    total?: number;
    pageSize?: number;
    numberOfPages?: number;
    currentPage?: number,
    nextPage?: number,
    previousPage?: number,
}