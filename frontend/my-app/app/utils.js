import AsyncStorage from "@react-native-async-storage/async-storage";

export async function api(method, endpoint, jsonBody, options = {
    disableError: false,
    auth: true
}) {
    const token = await AsyncStorage.getItem('token')
    if (options.auth) {
        if (!token) {
            return Promise.reject('auth required')
        }
    }
    return fetch(process.env.EXPO_PUBLIC_API_ENDPOINT + endpoint, {
        method,
        body: (
            (method === "GET" || typeof jsonBody === "undefined") ? null :
                (jsonBody instanceof FormData) ?
                    // 如果是 FormData 就不要轉成 JSON
                    jsonBody :
                    JSON.stringify(jsonBody)
        ),
        headers: {
            ...(jsonBody instanceof FormData) ? {
                // 如果是 FormData 就不要加 Content-Type
            } : ({
                'Content-Type': 'application/json',
            }),
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(async (res) => {
        // 避免 migration 後的 token 失效
        //if (res.status === 401 && !SSR) {
        //    await AsyncStorage?.removeItem('token')
        //}
        const data = await res.json()
        if (res.status >= 400) {
            if (options.disableError !== true) {
                // error
                // alert(data.message)
            }
            return Promise.reject(JSON.stringify(data))
        }
        return data
    })
}