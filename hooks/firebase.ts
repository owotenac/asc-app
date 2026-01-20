// Import the functions you need from the SDKs you need
import { CategoryProps } from '@/constants/CategoryProps';
import { MatchCardProps, PlateauCardProps } from '@/constants/MatchCardProps';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';
import { collection, Firestore, getDocs, getFirestore, limit, orderBy, query, Timestamp, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4lA_g9wOw35HTV-xfU0t_-wS6H4_f-uw",
    authDomain: "asc-bd.firebaseapp.com",
    projectId: "asc-bd",
    storageBucket: "asc-bd.firebasestorage.app",
    messagingSenderId: "295210778317",
    appId: "1:295210778317:web:9308e5f2e77273f13bf384",
    measurementId: "G-JZW2BY86GR",
    databaseURL: "https://asc-bd-default-rtdb.europe-west1.firebasedatabase.app"
};
// Initialize Firebase once
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
// Initialize services
const firestoreDB: Firestore = getFirestore(firebaseApp);
const firestoreRealtimeDB: Database = getDatabase(firebaseApp);

// Export instances
export { firebaseApp, firestoreDB, firestoreRealtimeDB };


export async function ReadTeamAgenda(category: CategoryProps) {

    try {

        //const analytics = getAnalytics(app);
        const dbcollection = collection(firestoreDB, "f11")
        const q = query(dbcollection,
            where('CompetitionID', '==', category.cp_no),
            where('CompetitionPhase', '==', category.cp_phase),
            orderBy('Date', 'asc'),
            limit(30),);
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map(doc => ({
            ...doc.data()
        })) as MatchCardProps[];

        return results;

    } catch (error) {
        console.error("Failed to initialize Firestore:", error);
        throw new Error("Could not connect to Firestore." + error);
    }
}

export async function GetMatchFromDB(date: Date, cpId: string) {

    try {
        //const analytics = getAnalytics(app);
        const dbcollection = collection(firestoreDB, "f11")

        // Calculate the start and end dates (2 days range)
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() - 1); // 1 day before
        startDate.setHours(0, 0, 0, 0); // Start of day

        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1); // 1 day after
        endDate.setHours(23, 59, 59, 999); // End of day

        const q = query(dbcollection,
            where('CompetitionID', '==', cpId),
            where("Date", ">=", startDate),
            where("Date", "<=", endDate),
            limit(1),);
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map(doc => ({
            ...doc.data()
        })) as MatchCardProps[];

        return results[0];

    } catch (error) {
        console.error("Failed to initialize Firestore:", error);
        throw new Error("Could not connect to Firestore." + error);
    }
}

export async function ReadDB(date: Date, homeFilter: boolean) {

    // Define start and end dates
    const currentDay = date.getDay();
    // Calculate days to subtract to get to Monday
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
    // Get Monday
    const monday = new Date(date);
    monday.setDate(date.getDate() - daysToMonday);
    // Get Sunday (6 days after Monday)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const startDate = Timestamp.fromDate(new Date(monday));
    const endDate = Timestamp.fromDate(new Date(sunday));
    try {
        const dbcollection = collection(firestoreDB, "f11")

        if (!homeFilter) {
            const q = query(dbcollection,
                //where('Section', '==' ,category),
                where("Date", ">=", startDate),
                where("CompetitionType", "!=", "FAL"),
                where("Date", "<=", endDate),
                orderBy('Date', 'asc'), limit(20),);

            const querySnapshot = await getDocs(q);

            const results = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })) as MatchCardProps[];

            //console.log(results)
            return results;
        }
        else {
            const q = query(dbcollection,
                where('home', '==', 'AS CANET'),
                where("CompetitionType", "!=", "FAL"),
                where("Date", ">=", startDate),
                where("Date", "<=", endDate),
                orderBy('Date', 'asc'), limit(20),);

            const querySnapshot = await getDocs(q);

            const results = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })) as MatchCardProps[];

            //console.log(results)
            return results;
        }


    } catch (error) {
        console.error("Failed to initialize Firestore:", error);
        throw new Error("Could not connect to Firestore." + error);
    }
}

export async function ReadDBPlateau(date: Date) {

    // Define start and end dates
    const currentDay = date.getDay();
    // Calculate days to subtract to get to Monday
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
    // Get Monday
    const monday = new Date(date);
    monday.setDate(date.getDate() - daysToMonday);
    // Get Sunday (6 days after Monday)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const startDate = Timestamp.fromDate(new Date(monday));
    const endDate = Timestamp.fromDate(new Date(sunday));
    try {
        const dbcollection = collection(firestoreDB, "FAL")

        const q = query(dbcollection,
            //where('Section', '==' ,category),
            where("Date", ">=", startDate),
            where("Date", "<=", endDate),
            orderBy('Date', 'asc'), limit(20),);

        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map(doc => ({
            ...doc.data()
        })) as PlateauCardProps[];

        return results;

    } catch (error) {
        console.error("Failed to initialize Firestore:", error);
        throw new Error("Could not connect to Firestore." + error);
    }
}

export async function ReadTeam() {

    try {
        const dbcollection = collection(firestoreDB, "team")

        const q = query(dbcollection, orderBy('cp_name', 'asc'), limit(20),);
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map(doc => ({
            ...doc.data()
        })) as CategoryProps[];

        //console.log(results)
        return results;

    } catch (error) {
        console.error("Failed to initialize Firestore:", error);
        throw new Error("Could not connect to Firestore." + error);
    }
}

export async function getClassement(API_URL: string)  {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                console.log(`${response.status}`);
                return null
            }
            else {
                const jsonData = await response.json();
                if (jsonData['hydra:member']) {
                    return jsonData['hydra:member'];
                } 
                else if (Array.isArray(jsonData)) {
                    return jsonData
                }
                else {
                    console.log('Unexpected response structure:', jsonData);
                    return null
                }
            }
        } catch (err) {
            console.log(`${err}`);
            return null
        } 
}