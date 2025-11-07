import { Pressable } from '@/components/ui/pressable';
import { CategoryProps } from '@/constants/CategoryProps';
import { useAppStore } from '@/constants/filter';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export function TeamCard(props: CategoryProps) {
    const router = useRouter();
    const { cpId, setCompetitionId } = useAppStore();
    const { category, setCategory } = useAppStore();

    const openDetails = () => {
        setCategory(props.cp_name)
        setCompetitionId(String(props.cp_no))
        router.push({
            pathname: '/team-details'
        }
        );
    }
    return (
        <Pressable onPress={() => openDetails()}>
            <View style={styles.team_card}>

                <AntDesign name="bars" size={32} color="white" />
                <View style={styles.view_category}>
                    <Text style={styles.text_team}>{props.cp_name}</Text>
                    <FontAwesome5 name="arrow-circle-right" size={24} color="black" />
                </View>
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
        backgroundColor: '#ffffffff',
        padding: 20,
        margin: 5,
        borderRadius: 5,
    },
    text_team: {
        color: '#000000ff',
        fontSize: 20,
    },
    team_card: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',        
        //backgroundColor: '#3b572dff',
        //justifyContent: 'center',




    }
});