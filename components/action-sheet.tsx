
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';


const ActionSheetCustom = forwardRef((props, ref) => {

    const actionSheetRef = useRef<ActionSheetRef>(null);
    const router = useRouter();

    useImperativeHandle(ref, () => ({
        setShow() {
            actionSheetRef.current?.show();
        }
    }));

    const affiche = () => {
        // Navigation logic to Affiche screen
        router.push({
            pathname: '/affiche'
        }
        )
        actionSheetRef.current?.hide();
    }
    const resultat = () => {
        // Navigation logic to Resultat screen
        router.push({
            pathname: '/resultat'
        }
        )
        actionSheetRef.current?.hide();
    }
    const program = () => {
        // Navigation logic to Resultat screen
        router.push({
            pathname: '/program'
        }
        )
        actionSheetRef.current?.hide();
    }
    const classement = () => {
        // Navigation logic to Resultat screen
        router.push({
            pathname: '/team-classement'
        }
        )
        actionSheetRef.current?.hide();
    }



    return (
        <View>

            <ActionSheet ref={actionSheetRef} containerStyle={{ backgroundColor: 'black' }} >
                <View style={styles.container}>
                    <AntDesign.Button name="file-text" backgroundColor='black' size={24} color="white" onPress={affiche}>Generate Affiche</AntDesign.Button>
                    <AntDesign.Button name="trophy" backgroundColor='black' size={24} color="white" onPress={resultat}>Generate Resultat</AntDesign.Button>
                    <AntDesign.Button name="menu" backgroundColor='black' size={24} color="white" onPress={program}>Generate Program</AntDesign.Button>
                    <AntDesign.Button name="menu" backgroundColor='black' size={24} color="white" onPress={classement}>Generate Classement</AntDesign.Button>

                </View>
            </ActionSheet>
        </View>
    )
})
// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        gap: 5,
        color: 'white',
        backgroundColor: 'black',
        minHeight:300, 
        marginBottom:250
    }
});



export default ActionSheetCustom;