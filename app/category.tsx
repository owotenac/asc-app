import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAppStore } from '@/constants/filter';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CircleIcon } from '@/components/ui/icon';
import {
    Radio,
    RadioGroup,
    RadioIcon,
    RadioIndicator,
    RadioLabel,
} from '@/components/ui/radio';

import { Switch } from '@/components/ui/switch';


export default function CategoryScreen() {

    const router = useRouter();
    const { category, setCategory } = useAppStore();

    return (

        <View style={styles.view}>
            <Text className="font-bold" size='xl'>Catégorie</Text>

            <RadioGroup value={category} onChange={setCategory}>
                <VStack space="2xl">
                    <Radio value="f11" size='md'>
                        <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Foot 11</RadioLabel>
                    </Radio>

                    <Radio value="f11_ecf" size='md'>
                        <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Foot 8</RadioLabel>
                    </Radio>

                    <Radio value="f5" size='md'>
                        <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Foot 5</RadioLabel>
                    </Radio>
                </VStack>
            </RadioGroup>
            
            <HStack space="md">
                <Switch
                    size="md"
                    isDisabled={false}
                    trackColor={{ false: '#d4d4d4', true: '#525252' }}
                    thumbColor="#fafafa"
                    ios_backgroundColor="#d4d4d4"
                />
                <Text size="sm">Foot 11</Text>
            </HStack>

            <HStack space="md">
                <Switch
                    size="md"
                    isDisabled={false}
                    trackColor={{ false: '#d4d4d4', true: '#525252' }}
                    thumbColor="#fafafa"
                    ios_backgroundColor="#d4d4d4"
                />
                <Text size="sm">Foot 11</Text>
            </HStack>

            <HStack space="md">
                <Switch
                    size="md"
                    isDisabled={false}
                    trackColor={{ false: '#d4d4d4', true: '#525252' }}
                    thumbColor="#fafafa"
                    ios_backgroundColor="#d4d4d4"
                />
                <Text size="sm">Foot 11</Text>
            </HStack>


        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20,
        gap: 20,
        backgroundColor: '#024906ff'
    }

});
