
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import MovableView from './movable-view';

type MovableTextProps = {
    text: string;
};


export default function MovableText({ text }: MovableTextProps) {
    const isBlack = useSharedValue(false);
    const textSize2 = useSharedValue(60);
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
            icon: () => <MaterialCommunityIcons name="format-font-size-decrease" size={24} color="white" />,
            onPress: () => decreaseFontSize(),
        },
        {
            label: 'Size+',
            icon: () => <MaterialCommunityIcons name="format-font-size-increase" size={24} color="white" />,
            onPress: () => increaseFontSize(),
        },

    ];

    const decreaseFontSize = () => {
        textSize2.set(textSize2.value - 5)
        setTextSize(textSize2.value)
    }
    const increaseFontSize = () => {
        textSize2.set(textSize2.value + 5)
        setTextSize(textSize2.value)
    }

    const changeColor = () => {
        isBlack.value = !isBlack.value;
        setTextColor(isBlack.value ? 'black' : 'white')
    };


    return (
        <TouchableOpacity onPressIn={() => setActions(actions)}>
            <MovableView initialPosition={5}>
                <Text style={[styles.text_section, { color: textColor, fontSize: textSize }]}>{text}</Text>
            </MovableView>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    text_section: {
        width: '100%',
        fontFamily: 'Exo2',
        fontWeight: 600
    },
})