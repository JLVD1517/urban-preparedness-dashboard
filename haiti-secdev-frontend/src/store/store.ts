import { configureStore } from '@reduxjs/toolkit';
import appControlReducer from './modules/appControlStore';
import availableYearsReducer from './modules/availableYearsStore';
import histogramDataReducer from './modules/histogramDataStore';
import mapControlReducer from './modules/mapControlStore';
import sidebarControlStore from './modules/sidebarControlStore';
import eventsPageStore from './modules/eventsPageStore';

export const store = configureStore({
  reducer: {
    AppControl: appControlReducer,
    AvailableYears: availableYearsReducer,
    HistogramData: histogramDataReducer,
    MapControl: mapControlReducer,
    SidebarControl: sidebarControlStore,
    EventsPageStore: eventsPageStore,
  },
  devTools: true,
});

export default store;
