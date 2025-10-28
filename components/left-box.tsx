import { StyleSheet, Text, View } from 'react-native';


export function LeftBox() {
  return (
          <View style={styles.left_box}>
              <Text style={styles.text}>Agenda du WeekEnd</Text>
      </View>
  )
}



const styles = StyleSheet.create({
  text: {
    //flex:1,
    color: '#fff',
    fontSize: 20,
    transform: [{rotate: '-90deg'}]
  },
  left_box: {
    flex:1,
    //width: 300,
    backgroundColor: '#14611438',
    justifyContent: 'center'
  }
});