import React from 'react';
import {View, Button, Text, ScrollView} from 'react-native';
import Calendar from '../components/calendar/calendar';

class Welcome extends React.Component {
  static navigationOptions = ({navigation}) => {
   return {
    headerLeft: (
      <View style={{paddingLeft: 14}}>
         <Button
         onPress={() => navigation.navigate('Settings')}
         title="Go to Setting"
         color=""
       />
      </View>
     ),
    headerRight: (
     <View style={{paddingRight: 14}}>
        <Button
        onPress={() => alert('This is a button!')}
        title="Exit"
        color="black"
      />
     </View>
    ),
   }
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Map()
    }
  }

  handleChangeDate = (date) => {
    const sel = this.state.selectedDate.get(date) ? this.state.selectedDate.delete(date) : this.state.selectedDate.set(date, date)
    this.setState({selectedDate:  this.state.selectedDate})
    // console.log(this.state.selectedDate);
  }

  render = () => {
    return <ScrollView justifyContent='center' style={{flex: 1, backgroundColor: 'white'}}>
               <Calendar handleChangeDate ={this.handleChangeDate} selectedDate={this.state.selectedDate} />
           </ScrollView>
  }
}
  
export default Welcome;