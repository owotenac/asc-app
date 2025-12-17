import { useAppStore } from '@/constants/filter';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type DateSelectorProps = {
  onDateChange: (newDate: Date) => void;
};

const WeekScheduler: React.FC<DateSelectorProps> =  ({ onDateChange }) => {
    // State management
    const [localDate, setLocalDate] = useState<Date>(new Date())
    const {date, setDate } = useAppStore();
 
    const up = () => {
        const dUp = dayjs(localDate).add(1, 'weeks').format('YYYY-MM-DD');
        const d = new Date(dUp)

        setLocalDate(d)
        setDate(d)
        onDateChange(d)
    }

    const down = () => {
        const dDown = dayjs(localDate).subtract(1, 'weeks').format('YYYY-MM-DD');
        const d = new Date(dDown)

        setLocalDate(d)
        setDate(d)
        onDateChange(d)
    }

    const getText = () => {
        const dayOfWeek = localDate.getDay();
        const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;

        const saturday = new Date(localDate);
        saturday.setDate(localDate.getDate() + daysUntilSaturday);

        const saturdayDay = saturday.getDate(); // Day number (1-31)
        const monthName = saturday.toLocaleString('fr-FR', { month: 'long' }); // Full month name

        const text = `Semaine du ${saturdayDay} ${monthName}`;
        return text
    }

    // Side effects
    useEffect(() => {
        // Component did mount / update logic

        // Cleanup function
        return () => {
            // Cleanup logic
        };
    }, []);

    // Render
    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={down}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.text_team}>{getText()}</Text>
            <TouchableOpacity onPress={up}>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
        </View>

    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
        //backgroundColor: '#fff',
    },
    content: {
        flex: 1,

    },
    text_team: {
        color: 'white',
        fontSize: 20
    }
});

export default WeekScheduler;