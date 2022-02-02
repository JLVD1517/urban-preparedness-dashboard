import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { tileFields } from "../../services/tileFields";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Paper, FormControlLabel } from "@material-ui/core";
import EventNoteIcon from '@material-ui/icons/EventNote';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";
import Footerbar from "../FootBar/FooterBar";
import DateRangeFilter from "../DateRangeFilter/DateRangeFilter";
import AreaChartData from "../Chart/AreaChartData";
import CustomSwitch from "../BaseUIComponents/CustomSwitch";
import {
  tractId,
  mapAreaConfig,
  primaryScore,
  eventMapAreaConfig,
  eventsPrimaryScore,
} from "../../configuration/app-config";
import {
  MapGradientType,
  AppState,
  ArticleData,
} from '../../types';
import {
  resetFilterSlider,
  setSelectedItem,
} from "../../store/modules/sidebarControlStore";
import { scaleSteps } from "../../services/sharedFunctions";
import "./Map.scss";
import Popup from "./MapTooltip/Popup";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { InitialEventsComponentState, PlotData } from "../../types";
import ToneSlider from "../../ToneSlider/ToneSlider";
import { fetchArticles } from "../../store/modules/articlesStore";
import { EventsFilters } from "../../types/modules/eventsFilters.type";
import { fetchAvgArticlesTonePlot } from "../../store/modules/avgArticleTonePlotStore";
import { fetchNoOfArticlesPlot } from "../../store/modules/noOfArticlePlotStore";
import { setEventsLanguage } from "../../store/modules/eventsPageStore";

const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
    height: 80,
    padding: "5px 15px",
    margin: "10px",
  },
  headlines: {
    fontWeight: 700,
    fontSize: "18px",
    cursor:"pointer",
    textDecoration:'none',
    color:'inherit'
  },
  datePubline: {
    fontWeight: 700,
    fontSize: "14px",
  },
  mainHeader: {
    textAlign: "center",
  },
  rightDiv: {
    backgroundColor: theme.palette.background.default,
  },
  container2:{
    height: 'calc(100vh - 493px)',
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
    border: "3px solid rgba(255, 255, 255, 0.12)",
  },
  summarySection:{
    backgroundColor: "inherit",
    height: 50,
    padding: "5px 15px",
    margin: "10px",
  }
}));

interface MapProps {
  darkTheme: boolean;
  selectedMonth: number | number[];
  selectedYear: number | number[];
  mapGradient: MapGradientType;
}

const Map: React.FC<MapProps> = ({
  darkTheme,
  selectedYear,
  selectedMonth,
  mapGradient,
}) => {
  const classes = useStyles();
  const tableTheme = darkTheme
    ? createMuiTheme({ palette: { type: "dark" } })
    : createMuiTheme({ palette: { type: "light" } });
  const [map, setMap]: any = useState(null);
  // const [language, setLangugage]: any = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const startDate: string = useSelector(
    (state: AppState) => state.EventsPageStore.startDate
  );

  const endDate: string = useSelector(
    (state: AppState) => state.EventsPageStore.endDate
  )

  const language: string = useSelector (
    (state: AppState) => state.EventsPageStore.language
  );

  const eventsFilter: EventsFilters = {
    start_date: startDate,
    end_date: endDate,
    tone_end_range: 0,
    tone_start_range: 0,
    language: language,
    commune_id: -1
  };

  const selectedLayerId: string = useSelector(
    (state: AppState) => state.SidebarControl.selectedLayerId
  );

  const satelliteView: boolean = useSelector(
    (state: AppState) => state.MapControl.satelliteView
  );

  const filterSliderValue: [number, number] = useSelector(
    (state: AppState) => state.SidebarControl.filterSlider
  );

  const noOfArticlesPlotData: PlotData[] | [] = useSelector(
    (state: AppState ) => state.NoOfArticleStore.noOfArticlesPlotData
  );

  const avgTonePlotData: PlotData[] = useSelector(
    (state: AppState) => state.AverageArticleToneStore.avgTonePlotData
  );

  // console.log("noOfArticlesPlotData ===>>> ", noOfArticlesPlotData);

  // console.log("avgTonePlotData ===>>> ", avgTonePlotData);
  
  const articlesData: ArticleData[] | [] = useSelector (
    (state: AppState) => state.ArticlesStore.articles
  );

  const setSelection = (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData
  ): void => {
    if (e.features !== undefined && e.features.length > 0) {
      const newSelection = e.features[0];
      if (newSelection.properties !== null) {
        eventsFilter.commune_id = newSelection.properties.gid; 
        dispatch(fetchArticles(eventsFilter));
        dispatch(setSelectedItem(newSelection.properties));
      }
    }
  };

  const setFilters = () => {
    if (map) {
      map.setFilter("uppd-layer", [
        "all",
        ["has", primaryScore],
        [">=", ["to-number", ["get", primaryScore]], filterSliderValue[0]],
        ["<=", ["to-number", ["get", primaryScore]], filterSliderValue[1]],
      ]);
    }
  };

  const setMapFills = () => {
    const fillColor:
      | string
      | mapboxgl.StyleFunction
      | mapboxgl.Expression
      | undefined = [
      "interpolate",
      ["linear"],
      ["to-number", ["get", eventsPrimaryScore]],
      scaleSteps().step1,
      mapGradient.step1,
      scaleSteps().step2,
      mapGradient.step2,
      scaleSteps().step3,
      mapGradient.step3,
      scaleSteps().step4,
      mapGradient.step4,
      scaleSteps().step5,
      mapGradient.step5,
      scaleSteps().step6,
      mapGradient.step6,
    ];
    if (map) {
      map.setPaintProperty("uppd-layer", "fill-color", fillColor);
    }
  };

  const resetLayer = () => {
    if (map) {
      if (map.getLayer("uppd-layer") !== undefined) {
        map.removeLayer("uppd-layer");
        map.removeSource("uppd-layer");
      }
      map.addLayer(layer);
    }
  };

  const clearSelectedItem = () => {
    if (map) {
      map.fire("close-all-popups");
      map.fire("clear-feature-state");
      dispatch(setSelectedItem(null));
    }
  };

  const layer: mapboxgl.FillLayer = {
    id: "uppd-layer",
    type: "fill",
    source: {
      type: "vector",
      tiles: [
        `${process.env.REACT_APP_MAP_TILESERVER_URL}get-commune/${startDate}/${endDate}/${language}/{z}/{x}/{y}`,
      ],
      promoteId: "gid",
      minzoom: 0,
      maxzoom: 22,
    },
    "source-layer": "tile",
    paint: {
      "fill-outline-color": "#343332",
      "fill-color": "transparent",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "click"], false],
        0.85,
        0.4,
      ],
    },
  };

  const visCheck = (state: boolean) => {
    if (state === true) {
      return "visible";
    }
    return "none";
  };

  let selectedId: number | string | undefined;

  useEffect(() => {
    // clear selected map items
    dispatch(setSelectedItem(null));
    dispatch(resetFilterSlider());
    dispatch(fetchArticles(eventsFilter));
    dispatch(fetchAvgArticlesTonePlot(eventsFilter));
    // dispatch(fetchNoOfArticlesPlot(eventsFilter));

    if (!mapRef.current) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: satelliteView
        ? eventMapAreaConfig.style.satellite
        : darkTheme
        ? eventMapAreaConfig.style.dark
        : eventMapAreaConfig.style.light,
      center: eventMapAreaConfig.mapCenter,
      zoom: eventMapAreaConfig.zoomLevel,
      maxBounds: eventMapAreaConfig.bounds,
    });

    // geocoder/search bar
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      marker: true,
    });

    // set the default popup
    const popup = new mapboxgl.Popup({
      className: "uppd-layer-popup",
    });

    const clearFeatureState = () => {
      if (selectedId !== undefined) {
        map.setFeatureState(
          {
            id: selectedId,
            source: "uppd-layer",
            sourceLayer: "tile",
          },
          { click: false }
        );
      }
    };

    map.on("load", () => {
      // set geocoder bounding box on load
      const bounds = map.getBounds();
      geocoder.setBbox([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ]);

      const addPopup = (el: JSX.Element, lat: number, lng: number) => {
        const placeholder = document.createElement("div");

        ReactDOM.render(el, placeholder);

        setTimeout(() => {
          popup.setDOMContent(placeholder).setLngLat({ lng, lat }).addTo(map);
        }, 5);
      };

      map.on(
        "click",
        "uppd-layer",
        (
          e: mapboxgl.MapMouseEvent & {
            features?: any;
          } & mapboxgl.EventData
        ) => {
          if (e.originalEvent.cancelBubble) {
            return;
          }
          // set selection
          setSelection(e);

          // add the popup
          addPopup(
            <Popup clickedItem={e.features[0].properties} />,
            e.lngLat.lat,
            e.lngLat.lng
          );

          // style the selected feature
          if (e.features !== undefined && e.features.length > 0) {
            clearFeatureState();

            // eslint-disable-next-line react-hooks/exhaustive-deps
            selectedId = e.features[0].id;

            if (selectedId !== undefined) {
              map.setFeatureState(
                {
                  id: selectedId,
                  source: "uppd-layer",
                  sourceLayer: "tile",
                },
                { click: true }
              );
            }
          }
        }
      );

      // pointer event on hover
      map.on("mouseenter", "uppd-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // add layers and set map
      map.addLayer(layer);
      setMap(map);

      if (document.getElementById("MapSearchBar")) {
        const removeAllChildNodes = (parent: any) => {
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }
        };

        const container = document.querySelector("#MapSearchBar");
        removeAllChildNodes(container);

        document
          .getElementById("MapSearchBar")!
          .appendChild(geocoder.onAdd(map));
      }
    });

    map.on("close-all-popups", () => {
      popup.remove();
    });

    map.on("clear-feature-state", () => {
      clearFeatureState();
    });
  }, [mapGradient, darkTheme]);

  useEffect(
    () => {
      if (map) {
        map.setStyle(
          satelliteView
            ? mapAreaConfig.style.satellite
            : darkTheme
            ? mapAreaConfig.style.dark
            : mapAreaConfig.style.light
        );
        setTimeout(() => {
          resetLayer();
          clearSelectedItem();
          setMapFills();
          // setFilters();
        }, 200);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [satelliteView]
  );

  useEffect(
    () => {
      resetLayer();
      clearSelectedItem();
      setMapFills();
      // setFilters();
      dispatch(resetFilterSlider());
      dispatch(fetchArticles(eventsFilter));
      dispatch(fetchAvgArticlesTonePlot(eventsFilter));
      // dispatch(fetchNoOfArticlesPlot(eventsFilter));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, startDate]
  );

  useEffect(
    () => {
      setMapFills();
      dispatch(resetFilterSlider());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, mapGradient, selectedLayerId]
  );

  // Filtering functions
  useEffect(
    () => {
      // setFilters();
      clearSelectedItem();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, filterSliderValue]
  );

  const toggleLanguage = () => {
    dispatch(setEventsLanguage(language === "ENGLISH" ? "FRENCH" : "ENGLISH"));
  };

  return (
    <div>
      <Grid container className="containerBox">
        <Grid item md={5}>
          <div>
            <div className="mapEventContainer" id="map" ref={mapRef} />
            <Footerbar
              mapGradient={mapGradient}
              elementData={"Number Of Events"}
              event={true}
            />
          </div>
        </Grid>
        <Grid item md={7} className={`${classes.rightDiv}`}>
          <div style={{ paddingTop: "3rem" }}>
            <div className="row">
              <h1 className={classes.mainHeader}>
                UN Haiti Port Au Prince Event Monitor
              </h1>
            </div>
          </div>
          <div className="wrapper">
            <div className="cusSwitch">
              <FormControlLabel
                label={language}
                control={
                  <CustomSwitch
                    checked={language === "ENGLISH"}
                    onChange={toggleLanguage}
                    name="toggle theme"
                  />
                }
              />
            </div>
            <div className="dateRangeFormat">
              <DateRangeFilter darkTheme={darkTheme} />
            </div>
            <div className="toneSlider">
              <ToneSlider />
            </div>
          </div>
          <Grid container style={{ paddingBottom: "35px" }}>
            <Grid item md={6} className="containerBox">
              <AreaChartData
                darkTheme={darkTheme}
                mapGradient={mapGradient}
                data={noOfArticlesPlotData}
              />
            </Grid>
            <Grid item md={6} className="containerBox">
              <AreaChartData
                darkTheme={darkTheme}
                mapGradient={mapGradient}
                data={avgTonePlotData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} className={classes.container2}>
          <ThemeProvider theme={tableTheme}>
            <Paper
              className={classes.summarySection}
              elevation={5}
            >
              <Grid container className={classes.headlines}>
                  Summary of Filters Selected - eg. Articles from (date range) with (event types) in (languages) by (publications)
              </Grid> 
            </Paper>
            <Box className={classes.root}>
              {articlesData && articlesData.length ?
                (articlesData as any[]).map((article: ArticleData) => (
                  <Paper
                    className={classes.listSection}
                    key={article.title}
                    elevation={5}
                  >
                    <div>
                    <a href={article.url} target="_blank" className={classes.headlines} rel="noreferrer"><div>{article.title}</div></a>
                      <Grid container>
                        <Grid item md={2} className={classes.datePubline}>
                          {article.publicationDate}
                        </Grid>
                        <Grid item md={3} className={classes.datePubline}>
                          {article.source}
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item md={2} className={classes.datePubline}>
                          Event Type: {article?.eventType.charAt(0).toUpperCase() + article?.eventType.slice(1)}
                        </Grid>
                        <Grid item md={3} className={classes.datePubline}>
                          Tone: {article.tone}
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                )): <div className="noDataAvail"><EventNoteIcon/> <span style={{paddingLeft:'1rem'}}>No News Headlines Available</span></div>
                }
            </Box>
          </ThemeProvider>
        </Grid>
    </div>
  );
};

export default Map;