import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import MovableView from './movable-view';

export default function SponsorsComponent() {
    // Configure the number of images to display
    const NUM_IMAGES = 3;
 
    const [imageNumbers, setImageNumbers] = useState<number[]>([]);

    useEffect(() => {
        getRandomNumbers();
    }, []);

    const changeSponsors = () => {
        getRandomNumbers();
    }


    const BASE_URL = 'https://res.cloudinary.com/dmx5bbziq/image/upload/';

    return (
        <MovableView initialPosition={200}>
            <View style={styles.container}>
                {imageNumbers.map((num, index) => (
                    <Pressable key={index} style={styles.imageWrapper}
                        onPress={changeSponsors}>
                        <Image
                            source={{ uri: `${BASE_URL}${num}.jpg` }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Pressable>
                ))} 
            </View>
        </MovableView>
    )

    function getRandomNumbers() {
        const numbers = Array.from({ length: NUM_IMAGES }, () => Math.floor(Math.random() * 25) + 1
        );
        setImageNumbers(numbers);
    }
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        gap: 10
        //minHeight: 50,
    },
      imageWrapper: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 45,
  },
})


