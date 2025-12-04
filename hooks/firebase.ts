// Import the functions you need from the SDKs you need
import { CategoryProps } from '@/constants/CategoryProps';
import { MatchCardProps, PlateauCardProps } from '@/constants/MatchCardProps';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, limit, orderBy, query, Timestamp, where } from "firebase/firestore";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4lA_g9wOw35HTV-xfU0t_-wS6H4_f-uw",
    authDomain: "asc-bd.firebaseapp.com",
    projectId: "asc-bd",
    storageBucket: "asc-bd.firebasestorage.app",
    messagingSenderId: "295210778317",
    appId: "1:295210778317:web:9308e5f2e77273f13bf384",
    measurementId: "G-JZW2BY86GR"
};

export async function ReadTeamAgenda(cpId: number) {

    try {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        //const analytics = getAnalytics(app);
        const dbcollection = collection(db, "f11")
        const q = query(dbcollection,
            where('CompetitionID', '==', cpId),
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
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        //const analytics = getAnalytics(app);
        const dbcollection = collection(db, "f11")

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
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        //const analytics = getAnalytics(app);
        const dbcollection = collection(db, "f11")

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
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        //const analytics = getAnalytics(app);
        const dbcollection = collection(db, "FAL")

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
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const dbcollection = collection(db, "team")

        const q = query(dbcollection, limit(20),);
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