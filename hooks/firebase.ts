// Import the functions you need from the SDKs you need
import { MatchCardProps } from '@/constants/MatchCardProps';
import dayjs from 'dayjs';
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



export async function ReadDB(date :string, category: string) {

    // Define start and end dates
    const startDate = Timestamp.fromDate(new Date(date));
    const dEnd = dayjs(date).add(2, 'days').format('YYYY-MM-DD')
    const endDate = Timestamp.fromDate(new Date(dEnd));

    try {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        //const analytics = getAnalytics(app);
        const dbcollection = collection(db, "f11")

        const q = query(dbcollection, 
            where('Section', '==' ,category),
            where("Date", ">=", startDate),
            where("Date", "<=", endDate),
            orderBy('Date', 'asc'), limit(10), );
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map(doc => ({
            ...doc.data()
        })) as MatchCardProps[];

        //console.log(results)
        return results;

    } catch (error) {
        console.error("Failed to initialize Firestore:", error);
        throw new Error("Could not connect to Firestore." + error);
    }
}

