import React from 'react';
import {View} from 'react-native';
import {months} from '../../constants/months'
import CalendarView from './calendar-view';
const month = months;
class Calendar extends React.Component { 
    state = {
        monthLabel: null,
        monthStartDayOfWeek: null,
        monthDays: null,
        lastMonthDays: null,
        currentYear: null,
        currentMonth: null,
        currentDay: null,
        storeCurrentMonth: null,
        storeCurrentDay: null,
        storeCurrentYear: null,
        selectedDate: new Map()
       }
      month = month
      constructor(props) {
        super(props)
    }
    componentDidMount() {
     this.setCalenderTime(false)
    }
    setCalenderTime(full_date) {
      let date, year, month, day, store;
      if(typeof full_date === 'object') {
         year = full_date.year;
         month = full_date.month;
         day = full_date.day;
         date = new Date(year, month, day);
         store = {};
      } else{
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDate();
        store = {storeCurrentYear: year, storeCurrentMonth: month, storeCurrentDay: day}
      }
     
      const m = this.month[date.getMonth()];
  
      const month_days = this.getNumberOfDays(year, month);
      const month_start_day_of_week = new Date(year, month, 1).getDay();
      const last_month_days = this.getLastMonthDays(year, month);
      this.setState({
        monthLabel: m,
        monthDays: month_days,
        monthStartDayOfWeek: month_start_day_of_week,
        lastMonthDays: last_month_days,
        currentYear: year,
        currentMonth: month,
        currentDay: day,
        ...store
      })
    }
    getPrev(current_year, current_month) {
      if(current_month > 0){
        last_month = current_month - 1;
        last_year = current_year;
      }
      else {
        last_month = 11;
        last_year = current_year - 1;
      }
      return {last_month: last_month, last_year: last_year}
    }
    getNext(current_year, current_month) {
      if(current_month == 11){
        last_month = 0;
        last_year = current_year + 1;
      }
      else {
        last_month = current_month + 1;
        last_year = current_year;
      }
      return {last_month: last_month, last_year: last_year}
    }
    getLastMonthDays(current_year, current_month) {
      const {last_month, last_year} = this.getPrev(current_year, current_month);
      return this.getNumberOfDays(last_year, last_month);
    }
    getNumberOfDays(year, month) {
      return 32 - new Date(year, month, 32).getDate();  
    }
  
    handleNextMonth = () => {
      const{currentYear, currentMonth} = this.state;
      const {last_month, last_year} = this.getNext(currentYear, currentMonth);
      this.setCalenderTime({year: last_year, month: last_month, day: 1})
    }
    handlePreviousMonth = () => {
      const{currentYear, currentMonth} = this.state;
      const {last_month, last_year} = this.getPrev(currentYear, currentMonth);
      this.setCalenderTime({year: last_year, month: last_month, day: 1})
    }
    getDate = (date) =>  `${this.state.currentYear}-${this.state.currentMonth}-${date}`;
    pickTime = async () => {
        try {
          const {action, hour, minute} = await TimePickerAndroid.open({
            hour: 14,
            minute: 0,
            is24Hour: false, // Will display '2 PM'
          });
          if (action !== TimePickerAndroid.dismissedAction) {
            // Selected hour (0-23), minute (0-59)
          }
        } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
        }
    } 
    render = () => {
      const { monthLabel, monthStartDayOfWeek, monthDays, lastMonthDays, 
              currentYear, currentMonth, currentDay, storeCurrentMonth,
              storeCurrentDay,storeCurrentYear} = this.state;
      const{handlePreviousMonth, handleNextMonth} = this;     
      return <View style={{height: 308, width: '100%'}}>
        <CalendarView
                monthLabel = {monthLabel}
                monthStartDayOfWeek ={monthStartDayOfWeek}
                monthDays= {monthDays}
                lastMonthDays= {lastMonthDays}
                currentYear= {currentYear}
                currentMonth= {currentMonth}
                currentDay= {currentDay}
                storeCurrentMonth= {storeCurrentMonth}
                storeCurrentDay= {storeCurrentDay}
                storeCurrentYear= {storeCurrentYear}
                onPreviousMonth = {handlePreviousMonth}
                onNextMonth = {handleNextMonth}
                onChangeDate = {this.props.handleChangeDate}
                selectedDate = {this.props.selectedDate}
                getDate = {this.getDate}
                getNext = {this.getNext}
                getPrev = {this.getPrev}
                onPickTime = {this.pickTime}
      />
      </View>
    }
}
 
export default Calendar;