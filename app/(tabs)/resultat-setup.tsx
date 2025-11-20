import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Pressable } from '@/components/ui/pressable';



import { ChevronRightIcon, Icon } from '@/components/ui/icon';

import DatePickerCP from '@/components/date-picker-cp';
import { useAppStore } from '@/constants/filter';
import * as ImagePicker from 'expo-image-picker';



export default function ResultatSetupScreen() {
    const router = useRouter();
    const { date, setDate } = useAppStore();
    const { category } = useAppStore();
    const [image, setImage] = useState<string | null>(null);

    const generateResult = () => {
        router.push({
            pathname: '/resultat',
            params: { image: image }
        }
        )
    }

    const generateAffiche = () => {
        router.push({
            pathname: '/affiche',
            params: { image: image }
        }
        )
    }

    const chooseCategory = () => {
        router.push({
            pathname: '/category',
            params: { category: category }
        }
        );
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 5],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <Text className="font-bold" size='xl'>Catégorie</Text>

                    <Pressable onPress={() => chooseCategory()} style={styles.pressable}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{category ? category : "Select Category... "}</Text>
                            <Icon as={ChevronRightIcon} size="lg" />
                        </View>
                    </Pressable>

                    <Text className="font-bold" size='xl'>Date</Text>
                    <DatePickerCP
                        value={date}
                        onChange={setDate}
                        mode="date"
                    />

                    <Text className="font-bold" size='xl'>Image</Text>
                    <Image
                        source={image ? image : require('../../assets/images/react-logo.png')}
                        alt='preview'
                        style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 10, marginBottom: 10 }}
                    />


                    <Button title="Select Image..." onPress={pickImage} />

                    <Button title="Generate Resultat" disabled={!category} onPress={generateResult} />

                    <Button title="Generate Affiche" disabled={!category} onPress={generateAffiche} />
                </View>
                {/* </ImageBackground> */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#024906ff'
    },
    view: {
        flex: 1,
        padding: 20,
        gap: 10
    },
    pressable: {
        marginBottom: 10,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        paddingVertical: 8,
    }

});
