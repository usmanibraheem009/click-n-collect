// import { router } from 'expo-router';
// import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { Alert } from 'react-native';
// import { auth, db } from '../firebaseConfig';
// import { getUserById } from '../firestore/firestoreServices';

// export interface userProps {
//     email: string,
//     password: string,
//     userName?: string,
//     profileImageUrl?: string
// }

// export const registerUser = async (data: userProps) => {
//     try {
//         const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
//         const user = userCredentials.user;

//         await setDoc(doc(db, 'users', user.uid), {
//             email: data.email,
//             userName: data.userName,
//             profileImage: data.profileImageUrl || ''
//         });

//         const uid = userCredentials.user.uid;

//         const userProfile = {
//             id: uid,
//             userName: data.userName,
//             email: data.email,
//             profileImage: data.profileImageUrl
//         }

//         return userProfile;

//     } catch (error) {
//         console.log('Error registering user: ', error);
//         throw error;
//     }
// };

// export const loginUser = async (data: userProps) => {
//     try {
//         const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
//         const uid = userCredentials.user.uid;

//         const userProfile = await getUserById(uid);
//         return userProfile;

//     }catch(error){
//         console.log('Error logging in user: ', error);
//         throw error;
//     }
// };

// export const logout = async () => {
//     try{
//         await signOut(auth);
//         router.replace('/screens/signup-screen')
//     }catch(error){
//         console.log('Error signingOut user: ', error);
//     }
// };

// export const passwordReset = async(data : userProps) => {
//     try{
//         await sendPasswordResetEmail(auth, data.email);
//         console.log('reset email sent')
//         Alert.alert('Success',
//      'A password reset email has been sent. Check your inbox.');
//     }catch(error: any){
//         console.log(error);

//         if(error.code === 'auth/user-not-found'){
//             Alert.alert('Error', 'No user found with this email')
//         }else if(error.code === 'auth/invalid-email'){
//             Alert.alert('Error', 'Please enter a valid email')
//         }else{
//             Alert.alert('Something went wrong')
//         }
//     }
// }