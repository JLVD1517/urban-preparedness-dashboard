import React, { useState } from 'react';
import { useTheme, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import DateRangeIcon from '@material-ui/icons/DateRange';
import moment from 'moment';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import './DateRangeFilter.scss';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../types';
import { setEventsEndDate, setEventsStartDate } from '../../store/modules/eventsPageStore';

interface DateRangeFilterProps {
  darkTheme: boolean;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ darkTheme }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      position: 'relative',
    },
  }));
  const [value, onSelect]: any = useState(null);
  const [modal, setModal]: any = useState<Boolean>(false);
  
  const startDate: string = useSelector(
    (state: AppState) => state.EventsPageStore.startDate
  );

  const endDate: string = useSelector(
    (state: AppState) => state.EventsPageStore.endDate
  )

  const onDateSelect = (value: any) => {
    dispatch(setEventsStartDate(moment(value.start).format('DD-MM-YYYY')));
    dispatch(setEventsEndDate(moment(value.end).format('DD-MM-YYYY')));
    onSelect(value);
  }

  const classes = useStyles();
  return (
    <div className="dateRange">
      <TextField
        id="outlined-read-only-input"
        label="Start-End Date Range"
        InputProps={{
          readOnly: true,
          endAdornment: <DateRangeIcon />
        }}
        variant="outlined"
        placeholder="Date Range"
        value={`${moment(startDate, 'DD-MM-YYYY').format('DD MMM YYYY')} - ${moment(endDate, 'DD-MM-YYYY').format('DD MMM YYYY')}`}
        onClick={() => setModal(!modal)}
      />
      {modal && (
        <div>
          <DateRangePicker
            selectionType="range"
            value={value}
            onSelect={(value: any) => {
              onDateSelect(value);
              setModal(!modal);
            }}
            numberOfCalendars={1}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;