import { Pressable } from '@/components/ui/pressable';
import { CategoryProps } from '@/constants/CategoryProps';
import { useAppStore } from '@/constants/filter';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export function TeamCard(props: CategoryProps) {
    const router = useRouter();
    const { setCategoryProps } = useAppStore();

    const openDetails = () => {
        setCategoryProps(props)
        router.push({
            pathname: '/team-details'
        }
        );
    }
    return (
        <Pressable 
        onPress={() => openDetails()
        }>
            <View style={styles.team_card}>
                <View style={styles.view_category}>
                    <Text style={styles.text_team}>{props.cp_name}</Text>
                    <FontAwesome5 name="arrow-circle-right" size={24} color="white" />
                </View>
                    <Text style={styles.text_poule}>Phase {props.cp_phase} - {props.cp_poule_name}</Text>                
            </View>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    view_category: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //verticalAlign: "middle",
    },
    text_team: {
        color: '#ffffffff',
        fontSize: 25,
        fontFamily: "LatoRegular"
    },
    team_card: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#49704dff',
        padding: 15,
        margin: 5,
        borderRadius: 10,
        //borderWidth:1,
        //borderBottomColor: "white"
    },
    text_poule: {
        color: '#ffffffff',
        fontSize: 10,
       // fontFamily: "LatoRegular"
    }

});