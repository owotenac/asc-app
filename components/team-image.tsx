
import React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';



type Props = {
    imageSize: number;
    imgSource: ImageSourcePropType;
};

export default function TeamImage({ imageSize, imgSource }: Props) {

    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

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
        <GestureDetector gesture={dragGesture}>
            <Animated.View style={[dragStyle, { top: 0 }]}>
                <GestureDetector gesture={pinchGesture}>
                    <Animated.View style={scaleStyle}>
                        <Animated.Image source={imgSource} resizeMode="contain" style={{ width: imageSize, height: imageSize }} />
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        //backgroundColor: '#25292e',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    image: {
        flex: 1,
    }
});