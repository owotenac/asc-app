
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const MovableView = ({ children, initialPosition }: { children: React.ReactNode, initialPosition: number }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

        // Side effects
    useEffect(() => {
        return () => {
            // Cleanup logic
        };
    }, []);

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

    const dragGesture = Gesture.Pan()
        .onChange(event => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        });

    return (
        <View>
            <GestureDetector gesture={Gesture.Exclusive(dragGesture)}>
                <Animated.View style={[dragStyle, { position:'absolute', top:initialPosition,  height: 'auto', width: 'auto', backgroundColor: 'transparent'}]}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

export default MovableView