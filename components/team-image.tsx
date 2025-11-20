
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    imageSize: number;
    imgSource: ImageSourcePropType;
    onScreenshot: () => void;
};

export default function TeamImage({ imageSize, imgSource, onScreenshot }: Props) {

    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const { setActions } = useToolBarStore();

    const share = () => {  
        console.log("share")
    }
    const screenShot = () => {  
        console.log("screenshot")
        onScreenshot();
    }

    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Share',
            icon: () =><Entypo name="share" size={24} color="white"/>,
            onPress: () => share(),
        },
        {
            label: 'ScreenShot',
            icon:  () => <MaterialIcons name="screenshot" size={24} color="white"/>,
            onPress: () => screenShot(),
        }
    ];

    const select = Gesture.Tap().runOnJS(true).onEnd(() => {
        setActions(actions)
    });

    const dragGesture = Gesture.Pan()
        .onChange(event => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const scaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

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

    return (
        <>
        <GestureDetector gesture={Gesture.Exclusive(dragGesture, select)}>
            <Animated.View style={[dragStyle, { top: 0 }]}>
                <GestureDetector gesture={pinchGesture}>
                    <Animated.View style={scaleStyle}>
                        <Animated.Image source={imgSource} resizeMode="contain" style={{ width: imageSize, height:imageSize }} alt={"img"}/>
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
        </>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    image: {
        flex: 1,
    }
});