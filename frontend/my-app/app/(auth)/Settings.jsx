import React, {useContext} from 'react';
import {View, Image, Text, StyleSheet, Button} from 'react-native';
import {Link} from 'expo-router';
import {icons} from '../../constants';
import {UserContext} from "../_layout";
import moment from "moment/moment";

const AvatarComponent = ({user}) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.border}>
                    <Image
                        source={icons.user}
                        style={styles.avatar}
                    />
                </View>
            </View>
            <Text style={styles.text}>{user?.name}</Text>
            <Text style={styles.text}>{-moment(user?.birthday).diff(moment(), 'year')} | {user?.gender}</Text>

            <Link href={'/EditProfile'} style={styles.buttonContainer}>
                <Button title="Edit Profile" onPress={() => handleEditProfile()}/>
            </Link>
            <Link href={'/CareRecipient/Recording'} >CareGiver</Link>
        </View>

    );
};

const Settings = () => {
    const {user} = useContext(UserContext);
    return (
        <View>
            <AvatarComponent user={user}/>
        </View>
    );
};
const handleEditProfile = () => {

    console.log('Edit Profile button clicked');
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    text: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
});

export default Settings;
