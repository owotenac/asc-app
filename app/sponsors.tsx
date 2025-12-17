import AfficheBase from '@/components/affiche-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function SponsorsComponent() {
    // Configure the number of images to display
    const NUM_IMAGES = 6;

    const [imageNumbers, setImageNumbers] = useState<any[]>([]);

    useEffect(() => {
        getRandomNumbers();
    }, []);

    const changeSponsors = () => {
        getRandomNumbers();
    }


    const BASE_URL = 'https://res.cloudinary.com/dmx5bbziq/image/upload/';

    return (
        <AfficheBase
        verticalText=''
            showVertialText={false}>
            <Pressable 
                onPress={changeSponsors}>
                <View style={styles.container}>
                    <FlatList style={styles.list}
                        data={imageNumbers}
                        numColumns={2}
                        renderItem={
                            ({ item }) => (
                                <Image
                                    source={{ uri: item.uri }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            )
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </Pressable>
            <Text style={styles.text}>MERCI A NOS SPONSORS</Text>
        </AfficheBase>
    )

    function getRandomNumbers() {
        const numbers = []
        while (numbers.length < NUM_IMAGES) {
            const number = Math.floor(Math.random() * 25) + 1
            const img = `${BASE_URL}${number}.jpg`

            numbers.push({
                uri: img,
                id: number
            });
        }

        setImageNumbers(numbers);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        margin:20,
    },
    imageWrapper: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: 200,
        height: 150,
        margin: 10,
        borderRadius: 8,
    },
    list: {
        flex: 1,
        gap: 10,
    },
    text: {
        marginTop:20,
        color: 'white',
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "LatoItalic",
        textAlign: 'center'
    }
})


