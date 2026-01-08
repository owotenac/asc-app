import { useToolBarStore } from '@/constants/toolbarprovider';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const captureWidth = screenWidth;
const captureHeight = (screenWidth / 4) * 5; // 4:5 ratio

export default function Toolbar() {

    const {actions} = useToolBarStore();

    return (
          <View style={styles.statusBar}>
             {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                style={{
                  backgroundColor: 'black',
                  padding: 10,
                  borderColor: 'white',
                  borderWidth: 2,
                  borderRadius: 30
                }}
              >
               {action.icon()} 
              </TouchableOpacity>
            ))} 
          </View>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    //backgroundColor: 'black',
    //height: 80,
    //flex: 1,
    flexDirection: 'column',
    //padding: 20,
    //margin: 10,
    gap: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 200,
    left: captureWidth - 60,
    //right: 0,
  },
})