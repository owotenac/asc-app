
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type MovableTextProps = {
    text: string;
};


export default function MovableText({ text }: MovableTextProps) {
    const isBlack = useSharedValue(false);
    const textSize2 = useSharedValue(60);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const [textColor, setTextColor] = useState('white');
    const [textSize, setTextSize] = useState(60);

  

    const { setActions } = useToolBarStore();

    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Color',
            icon: () => <AntDesign name="font-colors" size={24} color="white" />,
            onPress: () => changeColor(),
        },
        {
            label: 'Size-',
            icon:  () => <MaterialCommunityIcons name="format-font-size-decrease" size={24} color="white" />,
            onPress: () => decreaseFontSize(),
        },
        {
            label: 'Size+',
            icon:  () => <MaterialCommunityIcons name="format-font-size-increase" size={24} color="white" />,
            onPress: () => increaseFontSize(),
        },

    ];



    const dragStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    const select = Gesture.Tap().runOnJS(true).onEnd(() => {
        setActions(actions)
    });

    const decreaseFontSize = () => { 
        textSize2.set ( textSize2.value - 5)
        setTextSize( textSize2.value )
     }
    const increaseFontSize = () => { 
        textSize2.set (textSize2.value + 5)
        setTextSize( textSize2.value )
     }

    const changeColor = () => {
            isBlack.value = !isBlack.value;
            setTextColor( isBlack.value ? 'black' : 'white')
    };


    const dragGesture = Gesture.Pan()
        .onChange(event => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        });

    return (
        <>
            <GestureDetector gesture={Gesture.Exclusive(dragGesture, select)}>
                <Animated.Text style={[dragStyle, styles.text_section , {color:textColor, fontSize: textSize}]}>{text}</Animated.Text>
            </GestureDetector>
        </>
    )
}

const styles = StyleSheet.create({
  text_section: {
    position: 'absolute',
    top: 5,
    left: 50,
    width: '100%',
    fontFamily: 'Exo2',
    fontWeight: 600
  },
})