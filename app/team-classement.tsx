import AfficheBase from '@/components/affiche-base';
import MovableText from '@/components/movable-text';
import MovableView from '@/components/movable-view';
import { useAppStore } from '@/constants/filter';
import { getClassement } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function TeamClassement() {

    const { matchProps } = useAppStore();
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const {categoryProps} = useAppStore();

    const API_URL = `https://api-dofa.fff.fr/api/compets/${categoryProps.cp_no}/phases/${categoryProps.cp_phase}/poules/${categoryProps.cp_poule}/classement_journees?page=1`;

        const fetchCalendrier = async () => {
        try {
            const d = await getClassement(API_URL) 
            setData ( d );
            if (d)
                setLoading(false)
        }
       catch (error) {
            console.error("Error fetching matches:", error);
        }

    };

    useEffect(() => {
        //get the classement
        if (!data) {
            fetchCalendrier()
        }
    }, []);

    return (

        <AfficheBase
            verticalText='CLASSEMENT'
            showVertialText={true}>

                      <View style={styles.child}>
            <MovableText text={matchProps.Competition} />                

                <MovableView
                    initialPosition={100}>
                                   <View style={styles.tableContainer}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, styles.positionCell]}>Pos</Text>
                        <Text style={[styles.headerCell, styles.teamCell]}>Équipe</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>Pts</Text>
                    </View>
                    {!loading ? (
                        <>
                    {data?.map((item, index) => {
                        return (
                            <View
                                key={`${index}-${index}`}
                                style={[
                                    styles.tableRow,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                                ]}
                            >
                                <Text style={[styles.cell, styles.positionCell]}>{item.rank}</Text>
                                <Text style={[styles.cell, styles.teamCell,
                                    item.equipe.short_name === 'CANET AS' ? styles.highlightCell : null
                                
                                ]} numberOfLines={1}>
                                    {item.equipe.short_name || 'N/A'}
                                </Text>
                                <Text style={[styles.cell, styles.smallCell, styles.boldCell]}>{item.point_count}</Text>
                            </View>
                        );
                    })}
                    </>
                ): null}
                </View>    
                </MovableView>
        </View>                
        </AfficheBase>
    )
}

const styles = StyleSheet.create({

    tableContainer: {
        margin: 10,
        //backgroundColor: '#ffffff44',
        //borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        //backgroundColor: '#333',
        paddingVertical: 12,
    },
    headerCell: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    evenRow: {
        //backgroundColor: '#fff',
    },
    oddRow: {
        //backgroundColor: '#ccccccff',
    },
    cell: {
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 4,
        color: 'white',
        fontFamily: 'Exo2',
    },
    positionCell: {
        width: 40,
    },
    teamCell: {
        width: 200,
        textAlign: 'left',
        paddingLeft: 10,
    },
    smallCell: {
        width: 40,
    },
    boldCell: {
        fontWeight: 'bold',
    },
    highlightCell: {
        //fontWeight: 'bold',
        backgroundColor: '#407c31ff',
    },
    child: { 
        flex:1,
        width:screenWidth,
        position: 'absolute',
        top: 1
    }    

})




