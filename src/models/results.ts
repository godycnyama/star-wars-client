import { Person } from './person';

export type Results = {
    count: number;
    next?: string;
    previous?: string;
    results: Person[];
}
