import React from 'react';
import {View, Text, Button, ScrollView, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {months} from '../../constants/months'

class CalendarView extends  React.Component { 
  months = months
    constructor(props) {
        super(props)
    }

      renderDays() {
        const {lastMonthDays, monthDays, monthStartDayOfWeek,
             currentMonth, currentYear, storeCurrentDay, storeCurrentMonth, storeCurrentYear, onChangeDate} = this.props;
        const extra = !!monthStartDayOfWeek ? monthStartDayOfWeek : 0;
        const start_at = lastMonthDays - (extra);
        const calendar = new Array(lastMonthDays * 1).fill('').map((e, i) => i + 1)
                          .concat(new Array(monthDays * 1).fill('').map((e, i) => i + 1))
                          .concat(new Array(7).fill('').map((e, i) => i + 1))
                          .slice(start_at, start_at + 35);
        return  calendar.map((data, i) => {
            if((i < monthStartDayOfWeek) || (i >= (monthDays + extra))) {
              return <View key={i} style={[style.dayBox, style.blankDayBox]} ><Text style={[style.day]}>{data}</Text></View>
            }
          return (
           <TouchableOpacity onPress={() => {
             onChangeDate(this.props.getDate(data))
             this.props.onPickTime();
            }}  key={i}>
              <View style={[style.dayBox,
                 (currentYear === storeCurrentYear) && (currentMonth === storeCurrentMonth) && (data === storeCurrentDay) ? style.today: '',
                 (this.props.selectedDate.get(this.props.getDate(data)) ? style.selectedDay: '')   
                  ]} ><Text style={[style.day]}>{data}</Text></View>
           </TouchableOpacity>
          )
        })
    }
  
    renderControls = () => {
      if(!this.props.onPreviousMonth || !this.props.onNextMonth) {
        return
      }
       const {onPreviousMonth, onNextMonth, currentYear, currentMonth, getNext, getPrev} = this.props;
       const next_month = getNext(currentYear, currentMonth);
       const prev_month = getPrev(currentYear, currentMonth);
       return <View style={{width: '100%', marginTop: 20, justifyContent: 'space-around', flexDirection: 'row'}}>
          <Button color="black" title={this.months[prev_month.last_month]}  onPress={onPreviousMonth} />
          <Button  title={this.months[next_month.last_month]} onPress={onNextMonth} />
      </View> 
    }
    renderDaysOfTheWeek() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => {
        return <View key={i} style={[style.dayBox, style.calenderHeaderBox]} ><Text style={[style.day, style.dayHeader]}>{day}</Text></View>
      })
    }
   render() { 
        console.log(this.props.selectedDate);
        const {monthLabel, currentYear} = this.props;
       return (
                   <View style={style.mainContainer}>
                      <View><Text style={[style.monthLabel]}>{`${monthLabel} ${currentYear}`}</Text></View>
                      <View  style={[style.middleBlock]}>
                          {this.renderDaysOfTheWeek()}
                          {this.renderDays()}
                      </View>
                      {this.renderControls()} 
  
                   </View>
               
          ) 
      }
  }

  const style = {
    mainContainer:{
      height: 308,
      justifyContent: 'flex-start',
      alignItems: 'center',
     },
     middleBlock: {
     flexDirection: 'row',

    width: 252,
     flexWrap: 'wrap', 
    },
    dayBox: {
      height: 30,
      width: 30,
      margin: 2,
      paddingVertical: 3,
      borderRadius: 20,
      backgroundColor: 'pink',
      borderWidth: 1.2
    },
    day: {
      textAlign: 'center',
      color: 'white',
      fontSize: 15,
    },
    dayHeader: {
      fontSize: 13,
      color: 'black'
    },
    blankDayBox: {
      backgroundColor: 'lightgrey',
    },
    today: {
      backgroundColor: 'purple',
    },
    monthLabel: {
      fontSize: 24,
      color: 'black',
      backgroundColor: '',
      padding: 5,
      marginBottom: 5,
      borderRadius: 7
    },
    calenderHeaderBox: {
      backgroundColor: 'transparent',
    },
    selectedDay: {
       backgroundColor: 'green' 
    },
    btn: {
      height: 20
    }
}
 
export default CalendarView;