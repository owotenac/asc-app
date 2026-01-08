
import { pickImage, useImageStore } from '@/constants/image';
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const captureWidth = screenWidth;
const captureHeight = (screenWidth / 4) * 5; // 4:5 ratio

export default function TeamImage() {

    const scaleImage = useSharedValue(screenWidth);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const { setActions } = useToolBarStore();

    const {imgSrc, setImgSrc} = useImageStore();

    const [showHideGradient, setShowHideGradient] = useState(true)

    useEffect(() => {
    
    }, [imgSrc ]);

    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Image',
            icon: () => <Entypo name="image" size={24} color="white" />,
            onPress: () => pickImage(),
        },
        {
            label: 'Show/Hide Gradient',
            icon: () => <MaterialIcons name="rotate-90-degrees-cw" size={24} color="white" />,
            onPress: () => toogleGradient(),
        },

    ];
    const toogleGradient = () => {
        setShowHideGradient(prev => !prev)
    }

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
        <GestureDetector gesture={Gesture.Exclusive(dragGesture, select)}>
            <Animated.View style={[dragStyle, { top: 0 }]}>
                <GestureDetector gesture={pinchGesture}>
                    <Animated.View style={scaleStyle}>
                        {imgSrc && (
                            <Animated.Image 
                                source={{ uri: imgSrc }} 
                                resizeMode="contain" 
                                style={{ width: captureWidth, height: captureWidth}} 
                                alt="img" 
                            />
                        )}
                            <LinearGradient
                                colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', 'rgba(0,0,0,0.6)']}
                                style={showHideGradient? styles.gradient : styles.gradient_vertical}
                                pointerEvents="none"
                            />
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        flex:1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
                //transform: [{ rotate: '-90deg' }],
    },
    gradient_vertical: {
        position: 'absolute',
        flex:1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
                transform: [{ rotate: '-90deg' }],

    },
    scaleStyle : {
        position: 'absolute',
    }
});