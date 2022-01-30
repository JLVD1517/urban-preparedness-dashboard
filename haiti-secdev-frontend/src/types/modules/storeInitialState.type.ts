import { SelectedItemType } from './selectedItem.type';

export interface InitialStateAppControl {
  darkTheme: boolean;
  sideNavOpen: boolean;
}

export interface InitialStateMapControl {
  satelliteView: boolean;
}

export interface InitialAvailableYearsState {
  availableYears: number[];
  status: string;
  error: boolean;
  loaded: boolean;
}


export interface InitialSidebarState {
  selectedYear: number | number[];
  selectedMonth: number | number[];
  selectedItem: SelectedItemType | null;
  selectedLayerId: string;
  filterSlider: [number, number];
  sliderReset: number;
  desktopCollapse: boolean;
}

export interface InitialHistogramDataState {
  columnData: (number | null)[];
  status: string;
  error: boolean;
  loaded: boolean;
}

export interface AppState {
  AppControl: InitialStateAppControl;
  AvailableYears: InitialAvailableYearsState;
  HistogramData: InitialHistogramDataState;
  MapControl: InitialStateMapControl;
  SidebarControl: InitialSidebarState;
  EventsPageStore: InitialEventsComponentState
}

export interface plotData {
  name: string;
  value: number;
  date: string;
}

export interface InitialEventsComponentState {
  stateDate: string;
  endDate: string;
  noOfArticlesPlotData: plotData[];
  avgTonePlotData: plotData[];
}