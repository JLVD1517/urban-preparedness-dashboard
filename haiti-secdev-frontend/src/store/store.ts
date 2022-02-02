import { configureStore } from '@reduxjs/toolkit';
import appControlReducer from './modules/appControlStore';
import availableYearsReducer from './modules/availableYearsStore';
import histogramDataReducer from './modules/histogramDataStore';
import mapControlReducer from './modules/mapControlStore';
import sidebarControlStore from './modules/sidebarControlStore';
import eventsPageStore from './modules/eventsPageStore';
import articlesStore from './modules/articlesStore';
import avgArticleToneStore from './modules/avgArticleTonePlotStore';
import noOfArticleStore from './modules/noOfArticlePlotStore';

export const store = configureStore({
  reducer: {
    AppControl: appControlReducer,
    AvailableYears: availableYearsReducer,
    HistogramData: histogramDataReducer,
    MapControl: mapControlReducer,
    SidebarControl: sidebarControlStore,
    EventsPageStore: eventsPageStore,
    ArticlesStore: articlesStore,
    AverageArticleToneStore: avgArticleToneStore,
    NoOfArticleStore: noOfArticleStore,
  },
  devTools: true,
});

export default store;