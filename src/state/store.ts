import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import peopleReducer from './peopleState/peopleSlice';
import personReducer from './peopleState/personSlice';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    person: personReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

