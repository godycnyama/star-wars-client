import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Person } from '../../models/person';

export interface PersonState {
    person: Person
  }

export const initialState = {
  person: {}
} as PersonState;

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson: (state, { payload }: PayloadAction<Person>) => {
      state.person = payload
    }
  }
})

export const {
  setPerson
} = personSlice.actions

export const personSelector = (state: RootState) => state.person;
export default personSlice.reducer;