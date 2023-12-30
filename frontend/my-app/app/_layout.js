import {Stack} from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api} from "./utils";
import {Alert} from "react-native";
import {createContext, useEffect, useState} from "react";
import {PaperProvider} from "react-native-paper";


export const UserContext = createContext({
    user: null,
})
const Layout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const user = await api('GET', '/user');
                setUser(user);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const notification_data = await api('GET', '/notification');
                setNotifications(notification_data);
                console.log(notification_data)
                notification_data.forEach((notification, i) => {
                    if (notification.show_at) {
                        console.log(`This is notification ${i}`)
                        console.log(notification.show_at)
                        console.log(new Date(notification.show_at).getTime())
                        console.log(new Date(notification.show_at).getTime() - new Date().getTime())

                        if (
                            Math.abs(
                                new Date(notification.show_at).getTime() - new Date().getTime()
                            ) < 3000
                        ) {
                            Alert.alert(notification.data.title, notification.data.content)
                            api('POST', '/notification/read', {id: notification.id})
                        }
                    }
                })
            } else {
                console.log('No token')
            }
        }, 3000)
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <PaperProvider>
            <UserContext.Provider value={{user, loading}}>
                <Stack/>
            </UserContext.Provider>
        </PaperProvider>
    );
}

export default Layout;