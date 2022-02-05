import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../configuration/app-config';
import { InitialEventsComponentState } from '../../types';

const eventsComponentInitialState: InitialEventsComponentState = {
  startDate: '01-12-2020',
  endDate:  '01-12-2022',
  selectedCommuneId: -1,
  language: LANGUAGE.ENGLISH,
  selectedEvent: {
    event_id: -1,
    name: ''
  }
};

const eventsComponentSlice = createSlice({
  name: 'eventsComponent',
  initialState: eventsComponentInitialState,
  reducers: {
    setEventsStartDate: (
      state,
      { payload }: PayloadAction<string>,
    ): void => {
      state.startDate = payload;
    },
    setEventsEndDate: (
      state,
      { payload }: PayloadAction<string>,
    ): void => {
      state.endDate = payload;
    },
    setEventsLanguage: (
      state,
      { payload }: PayloadAction<string>,
    ): void => {
      state.language = payload
    },
    setSelectedEventId: (
      state,
      { payload }: PayloadAction<{event_id: number, name: string}>,
    ): void => {
      state.selectedEvent = payload
    },
    setSelectedCommuneId: (
      state,
      { payload }: PayloadAction<number>,
    ): void => {
      state.selectedCommuneId = payload
    },
  },
});


export const {
  setEventsStartDate,
  setEventsEndDate,
  setEventsLanguage,
  setSelectedEventId,
  setSelectedCommuneId
} = eventsComponentSlice.actions;

export default eventsComponentSlice.reducer;