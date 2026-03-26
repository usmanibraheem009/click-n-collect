import useTheme from '@/src/hooks/useTheme';
import { setImage } from '@/src/redux/slices/imageSlice';
import { db } from '@/src/services/firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const UserCard = () => {
    const profileImageUrl = useSelector((state: any) => state.imageReducer.imageUrl);
    const user = useSelector((state: any) => state.authReducer.user);
    const { theme } = useTheme();
    const dispatch = useDispatch();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.7,
            aspect: [1, 1]
        });

        if (!result.canceled) {
            dispatch(setImage(result?.assets[0].uri));
            await updateDoc(doc(db, 'users', user.id), {
                profileImage: profileImageUrl
            });
        }
    }

    return (
        <View style={styles.userCard}>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {profileImageUrl ? (
                    <Image source={{ uri: profileImageUrl }} style={styles.image}/>
                ) : (
                    <View >
                        <FontAwesome name='camera' size={24} />
                    </View>
                )}
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '500', color: theme.text.primary }}>{user?.userName}</Text>
                <Text style={{ fontSize: 12, fontWeight: '500', color: theme.text.secondary }}>{user?.email}</Text>
            </View>
        </View>
    )
}

export default UserCard

const styles = StyleSheet.create({
    userCard: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'flex-start',
        gap: 18
    },
    imageContainer: {
        height: 64,
        width: 64,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    dummy: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
    },
    image: {
        height: 64,
        width: 64,
        borderRadius: 50
    }
})