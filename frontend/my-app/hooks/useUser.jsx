import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api} from "../app/utils";

export default function useUser() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const token = AsyncStorage.getItem('token')
        api('GET', '/user', {}).then((res) => {
            setUser(res)
        })
    }, []);
    return {
        user
    }
}