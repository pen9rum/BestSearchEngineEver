import React, {useState, useEffect} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {StyleSheet, Text, View, Image} from 'react-native';
import {icons} from '../../constants';
import {router} from 'expo-router';
import {SelectList} from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {api} from '../utils';

const EditProfile = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);
    const gender_selection = [
        {key: '1', value: 'male'},
        {key: '2', value: 'female'},
        {key: '3', value: 'others'},
    ];

    useEffect(() => {
        (async () => {
            const {
                name, email, phone, gender, birthday
            } = await api("GET", '/user', {}, {auth: true})
            if (name)
                setName(name)
            if (email)
                setEmail(email)
            if (phone)
                setPhone(phone)
            if (gender)
                setGender(gender)
            if (birthday)
                setBirthday(birthday)
            setLoading(false)
        })()
    })

    const returntoSettings = () => {
        router.replace('/Settings');
    };

    const update = () => {
        api("PATCH", '/user', {
            name, email, birthday, phone, gender
        }).then(e => {
            alert("Update Success")
            returntoSettings()
        })
    }

    return (
        <View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    backgroundColor: 'purple',
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image source={icons.user} style={{
                        width: 120,
                        height: 120,
                        backgroundColor: 'white',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        alignSelf: 'center',
                    }}/>
                </View>
            </View>
            <Text style={styles.text}>{loading ? "Loading..." : name}</Text>
            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 20
            }}>
                <Button title="Edit" style={styles.buttonContainer}/>
                <TextInput onChangeText={setName} label="Name" value={name} keyboardType="text"/>
                <TextInput onChangeText={setPhone} label="Phone" value={name} keyboardType="text2s"/>
                <TextInput onChangeText={setEmail} label="Email" value={email} keyboardType="email-address"/>
                {/*<TextInput*/}
                {/*    onChangeText={setPassword}*/}
                {/*    secureTextEntry*/}
                {/*    label="Password"*/}
                {/*    value={password}*/}
                {/*    textContentType="password"*/}
                {/*/>*/}
                {/*<TextInput*/}
                {/*    onChangeText={(text) => {*/}
                {/*        setConfirmPassword(text);*/}
                {/*        if (text !== password) {*/}
                {/*            setError("Password doesn't match");*/}
                {/*        } else {*/}
                {/*            setError(null);*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    secureTextEntry*/}
                {/*    label="Confirm Password"*/}
                {/*    value={confirmPassword}*/}
                {/*    textContentType="password"*/}
                {/*/>*/}
                {/*{error && <Text style={styles.errorText}>{error}</Text>}*/}
                <TextInput onChangeText={setBirthday} label="Birthday Ex:2004/06/01" value={birthday}
                           keyboardType="numeric"/>
                <SelectList
                    setSelected={setGender}
                    data={gender_selection}
                    save="value"
                    arrowicon={<FontAwesome name="chevron-down" size={12} color={'purple'}/>}
                    value={gender}
                />
                <Button mode="contained" onPress={update} disabled={error !== null}>
                    Confirm
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        display: 'flex',
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
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        alignSelf: 'center',
    },
    text: {
        width: '100%',
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
    },
});

export default EditProfile;
