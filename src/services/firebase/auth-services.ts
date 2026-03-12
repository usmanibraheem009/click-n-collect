import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export interface userProps {
    email: string,
    password: string,
    userName?: string,
    profileImageUrl?: string
}

export const registerUser = async (data: userProps) => {
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
        console.log('Error registering user: ', error);
    }
};

export const loginUser = async (data: userProps) => {
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
    }catch(error){
        console.log('Error logging in user: ', error);
    }
};

export const logout = async () => {
    try{
        await signOut(auth);
    }catch(error){
        console.log('Error signingOut user: ', error);
    }
};