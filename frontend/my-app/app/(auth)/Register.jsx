import React, {useContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import {Button, TextInput} from "react-native-paper";
import {Link, router, Stack} from 'expo-router';
import {UserContext} from "../_layout";
import {api} from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";


const Register = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const type = params;
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [gender,setGender]= useState('')
    const [birthday,setBirthday]= useState('')
    const {user} = useContext(UserContext)
    // useEffect(() => {
    //     if (user)
    //         router.back()
    // }, []);

    const register = () => {
        api('POST', '/auth/register', {email, password, name, phone, type}, {auth: false}).then(async r => {
            await AsyncStorage.setItem('token', r.token)
            alert('註冊成功')
            router.replace('/Home')
        }).catch(err => {
            console.log(err)
            alert('註冊失敗')
        })
    }

    return (
        <View style={{
            padding: 20,
            flex: 1,
            flexDirection: 'column',
            marginTop: 80,
            gap: 20,
        }}>
            <Stack.Screen
                options={{
                    title: '註冊',
                }}
            />
             <TextInput onChangeText={setGender} label={"性別(男,女,不願透漏)"} value={gender} keyboardType={"email-address"}/>
            <TextInput onChangeText={setEmail} label={"電子郵件"} value={email} keyboardType={"email-address"}/>
            <TextInput onChangeText={setName} label={"姓名"} value={name} textContentType={'name'}/>
            <TextInput onChangeText={setBirthday} label={"生日"} value={birthday} keyboardType={"email-address"}/>
            <TextInput onChangeText={setPhone} label={"手機"} value={phone} textContentType={'telephoneNumber'}/>
            <TextInput onChangeText={setPassword} secureTextEntry={true} label={"密碼"} value={password}
                       textContentType={'password'}/>

            <Button mode="contained" onPress={register}>
                註冊
            </Button>

            <Link href={'/Login/Login'}>
                已經有帳號？立即登入
            </Link>
        </View>

    )
}

export default Register