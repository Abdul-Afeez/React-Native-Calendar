import React from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, Picker} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {months} from '../constants/months'
const month = months

class SettingsScreen extends React.Component {
    months = months;
    constructor(props) {
        super(props);
        this.state = { 
            startMonth: 7,
            monthDays: [],
            startDay: null,
            startTime: null,
            workingHour: null,
            restingHour: null,
            freeDays: [],

         }
    }
    setHoursPerDay = (changes) => {
        alert(changes)
    }
    renderMonths() {
        return this.months.map((e, i) => <Picker.Item label={e} value={i} key={i} />)
    }
     render = () => { 
        return (
            <KeyboardAvoidingView style={{flex: 1}}  behavior="padding" enabled> 
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'purple'}}>
                    <TextInput onChangeText={(changes) => this.setHoursPerDay(changes)} style={[style.input]}></TextInput>
               
                    <Picker
                    selectedValue={this.state.startMonth}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({startMonth: itemIndex})
                        this.setDays()
                    }
                    }>
                        
                       {this.renderMonths()}
                    </Picker>
                </View>
            </View>
            </KeyboardAvoidingView>
          );
    }
}
 
export default SettingsScreen;
const style = {
    input: {
        borderColor: 'pink',
        backgroundColor: 'white',
        width: 50,
        paddingLeft: 10
    }
}