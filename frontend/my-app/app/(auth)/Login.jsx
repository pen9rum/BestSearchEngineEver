import React, {useContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import {Button, TextInput} from "react-native-paper";
import {Link, Stack} from 'expo-router';
import {api} from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";
import {UserContext} from "../_layout";




const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useContext(UserContext)

    // useEffect(() => {
    //     if (user){
    //         router.replace('/Home')
    //
    //     }
    //         // router.back()
    // }, []);

    const login = () => {
        api('POST', '/auth/login', {email, password}, {auth: false}).then(async r => {
            await AsyncStorage.setItem('token', r.token)
            alert('登入成功')
            api('GET' , '/user', {}, {auth: true}).then(async r => {
                //r.type // 0 = CareRecipient, 1 = CareGiver
                if(r.type === 1) router.replace('/CareGiver/CareGiver')
                else if(r.type === 0) router.replace('/CareRecipient/Recipient')
                // router.replace('/Home')
            }).catch(err => {
                console.log(err)
                alert('登入失敗')
            })
            //router.replace('/Home')
        }).catch(err => {
            console.log(err)
            alert('登入失敗')
        })
    }

    return (
        <View style={{
            padding: 20,
            flex: 1,
            flexDirection: 'column',
            marginTop: 100,
            gap: 20,
        }}>
            <Stack.Screen
                options={{
                    title: '登入',
                }}
            />
            <TextInput onChangeText={setEmail} label={"電子郵件"} value={email} keyboardType={"email-address"}/>
            <TextInput onChangeText={setPassword} secureTextEntry={true} label={"密碼"} value={password}
                       textContentType={'password'}/>

            <Button mode="contained" onPress={login}>
                登入
            </Button>
            <Link href={'/Register/Register'}>
                還沒有帳號？立即註冊
            </Link>
        </View>

    )
}

export default Login