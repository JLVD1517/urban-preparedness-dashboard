import React from "react";
import { Select, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../types';
import { Event } from "../../types/modules/eventsFilters.type";
import { setSelectedEventId } from "../../store/modules/eventsPageStore";

const SelectEvent: React.FC = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 250,
    },
  }));
  const dispatch = useDispatch();

  const eventsList: Event[] | [] = useSelector (
    (state: AppState) => state.EventsListStore.events
  );

  const selectedEvent: Event = useSelector (
    (state: AppState) => state.EventsPageStore.selectedEvent
  );

  const handleYearSelection = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    dispatch(setSelectedEventId(eventsList[event.target.value as number]))
  };

  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel htmlFor="IndexSelect">Select Event</InputLabel>
      <Select
        id="IndexSelect"
        label="Urban Resiliency Index"
        native
        value={selectedEvent.event_id > 0 ? selectedEvent.name : null}
        onChange={handleYearSelection}
      >
        {(eventsList as Event[]).map((item: Event, index: number) => {
          return (
            <option key={item.event_id} value={index}>
              {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default SelectEvent;
