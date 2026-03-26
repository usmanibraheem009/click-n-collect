import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface userProps{
    email: string,
    name: string,
    profileImage?: string    
};


export const getUserById = async(currentUser : any) => {
    try{
        const currentUserInfo = currentUser;
        const userRef = doc(db, 'users', currentUserInfo);
        const snapshot = await getDoc(userRef);

        if(snapshot.exists()){
            return {
                id: snapshot.id,
                ...snapshot.data()
            };
        }
    }catch(error){
        console.log('Error getting user: ', error);
        throw error;
    }
}