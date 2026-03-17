import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import MovableView from './movable-view';

type MovableTextProps = {
    text: string;
};

export default function MovableText({ text }: MovableTextProps) {
    const localText = useSharedValue(text);
    const isBlack = useSharedValue(false);
    const textSize2 = useSharedValue(60);
    const [textColor, setTextColor] = useState('white');
    const [textSize, setTextSize] = useState(60);
    const [isEditing, setIsEditing] = useState(false);
    const [displayText, setDisplayText] = useState(text);
    const inputRef = useRef<TextInput>(null);

    const { setActions } = useToolBarStore();

    const startEditing = () => {
        setIsEditing(true);
        // Defer focus so the TextInput is mounted first
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const stopEditing = () => {
        setIsEditing(false);
        localText.value = displayText;
    };

    const actions: Action[] = [
        {
            label: 'Edit',
            icon: () => <AntDesign name="edit" size={24} color="white" />,
            onPress: () => startEditing(),
        },
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
        textSize2.set(textSize2.value - 5);
        setTextSize(textSize2.value);
    };

    const increaseFontSize = () => {
        textSize2.set(textSize2.value + 5);
        setTextSize(textSize2.value);
    };

    const changeColor = () => {
        isBlack.value = !isBlack.value;
        setTextColor(isBlack.value ? 'black' : 'white');
    };

    const sharedTextStyle = {
        color: textColor,
        fontSize: textSize,
    };

    return (
        <TouchableOpacity onPressIn={() => setActions(actions)}>
            <MovableView initialPosition={5}>
                {isEditing ? (
                    <TextInput
                        ref={inputRef}
                        value={displayText}
                        onChangeText={setDisplayText}
                        onBlur={stopEditing}
                        onSubmitEditing={stopEditing}
                        style={[styles.text_section, sharedTextStyle, styles.input]}
                        autoCorrect={false}
                        blurOnSubmit
                    />
                ) : (
                    <Text style={[styles.text_section, sharedTextStyle]}>
                        {displayText}
                    </Text>
                )}
            </MovableView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text_section: {
        width: '100%',
        fontFamily: 'Exo2',
        fontWeight: '600',
        textAlign: 'right',
    },
    input: {
        padding: 0,        // Neutralise default TextInput padding
        margin: 0,
        includeFontPadding: false,
    },
});