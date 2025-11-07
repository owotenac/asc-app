import React from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';

import { useAppStore } from '@/constants/filter';

export default function DatePicker() {


  const defaultStyles = useDefaultStyles();
  const { date, setDate } = useAppStore();


  return (
    <View style={styles.view}>

      <DateTimePicker
        styles={{
          ...defaultStyles,
          today: { borderColor: 'white', borderWidth: 1 },
          selected: { backgroundColor: 'green', color: 'white' },
        }}
        mode="single"
        date={date}
        containerHeight={140}
        //onChange={({ date }) => setDate(date)}
      />


    </View>
  );
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    gap: 20,
    backgroundColor: '#024906ff'
  }

});