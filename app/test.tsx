import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const DynamicBox = ({ color, text }: { color: string; text: string }) => (
    <View style={[styles.box, { backgroundColor: color }]}>
        <Text style={styles.text}>{text}</Text>
    </View>
);

const DynamicListExample = () => {
    const [boxes, setBoxes] = useState<{ id: number; color: string; text: string }[]>([]);

    const addBox = () => {
        const newBox = {
            id: Date.now(),
            color: ['#4CAF50', '#2196F3', '#FF9800'][boxes.length % 3],
            text: `Box ${boxes.length + 1}`,
        };
        setBoxes([...boxes, newBox]);
    };

    const updateLastBox = () => {
        if (boxes.length === 0) return;
        const updated = [...boxes];
        updated[boxes.length - 1].text += ' (updated)';
        setBoxes(updated);
    };

    return (
        <View style={styles.container}>
            <Button title="Add Box" onPress={addBox} />
            <Button title="Update Last Box" onPress={updateLastBox} />

            {boxes.map((box) => (
                <DynamicBox key={box.id} color={box.color} text={box.text} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        marginTop: 10,
        padding: 16,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DynamicListExample;
