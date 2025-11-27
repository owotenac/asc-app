import { useToolBarStore } from '@/constants/toolbarprovider';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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
    backgroundColor: 'black',
    height: 80,
    //flex: 1,
    flexDirection: 'row',
    //padding: 20,
    //margin: 10,
    //gap: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})