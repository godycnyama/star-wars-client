import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Person } from '../../models/person';
import { SearchStateParameters } from '../../models/searchStateParameters';

export interface PeopleState {
    searchStateParameters: SearchStateParameters,
    people: Person[]
  }

export const initialState = {
  people: [],
  searchStateParameters: {
    searchBy: "All",
    searchTerm: "",
    total: 0,
    pageSize: 10,
    numberOfPages: 0,
    currentPage: 1,
    nextPage: undefined,
    previousPage: undefined

  },
} as PeopleState;

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setSearchBy: (state, { payload }: PayloadAction<string>) => {
      state.searchStateParameters.searchBy = payload
    },
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchStateParameters.searchTerm = payload
    },
    setTotal: (state, { payload }: PayloadAction<number>) => {
      state.searchStateParameters.total = payload
    },
    setPageSize: (state, { payload }: PayloadAction<number>) => {
      state.searchStateParameters.pageSize = payload
    },
    setNumberOfPages: (state, { payload }: PayloadAction<number>) => {
      state.searchStateParameters.numberOfPages = payload
    },
    setCurrentPage: (state, { payload }: PayloadAction<number | undefined>) => {
      state.searchStateParameters.currentPage = payload
    },
    setNextPage: (state, { payload }: PayloadAction<number | undefined>) => {
      state.searchStateParameters.nextPage = payload
    },
    setPreviousPage: (state, { payload }: PayloadAction<number | undefined>) => {
      state.searchStateParameters.previousPage = payload
    },
    getPeopleSuccess: (state, { payload }: PayloadAction<Person[]>) => {
      state.people = payload
    }
  }
})

export const {
  setSearchBy,
  setSearchTerm,
  setTotal,
  setNumberOfPages,
  setPageSize,
  setCurrentPage,
  setNextPage,
  setPreviousPage,
  getPeopleSuccess,
} = peopleSlice.actions

export const peopleSelector = (state: RootState) => state.people;
export default peopleSlice.reducer;