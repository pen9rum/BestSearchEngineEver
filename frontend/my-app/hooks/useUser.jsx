import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUser() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const token = AsyncStorage.getItem('token')
    }, []);
    return {
        user
    }
}