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
            showVertialText={false}
            showTeamImage={false}
            >
                <View style={styles.container}>
            <Pressable 
                onPress={changeSponsors}>
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
            </Pressable>
            <Text style={styles.text}>MERCI A NOS SPONSORS</Text>
            </View>
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
        margin:30,
    },
    imageWrapper: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: 150,
        height: 115,
        margin: 10,
        borderRadius: 8,
    },
    list: {
        flex: 1,
        gap: 10,
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontFamily: "LatoItalic",
        textAlign: 'center'
    }
})


