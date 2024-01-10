import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {

    const [othersData, setOthersData] = useState([]);

    useEffect(() => {
        const fetchGoogleSearchData = async () => {
            try {
                const storedOthersData = await AsyncStorage.getItem('OthersData');
                if (storedOthersData) {
                    setOthersData(JSON.parse(storedOthersData));
                }
                console.log(storedOthersData)
            } catch (error) {
                console.error('Error fetching Google Search data from AsyncStorage:', error);
            }
        };

        fetchGoogleSearchData();
    }, []);

    return (
        <ImageBackground
            source={require("../../assets/pic/background.jpg")}
            resizeMode="cover"
            style={{
                width: '100%',
                height: '100%',
                justifyContent: "center",
                flex: 1,
            }}>

            <View style={{
                width: '100%',
                height: '100%',
                flex: 1,
                justifyContent: "flex-start",
                alignItems: 'center',
            }}>
                <View style={{
                    backgroundColor: '#FFC72C',
                    width: '100%',
                    alignItems: 'center',
                    paddingVertical: 10,
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'flex-start',
                        width: 330,
                    }}>

                        <View style={styles.container}>
                            <View style={styles.headArea}>
                                <Link href={{
                                    pathname: '/NBA/result',
                                    query: { type: 1 }
                                }}>
                                    <Image
                                        source={require('../../assets/icons/close.png')}
                                        style={{ width: 17, height: 17, marginRight: '10%', tintColor: 'white' }}
                                    />
                                </Link>
                                <Link href={{
                                    pathname: '/NBA/menu',
                                    query: { type: 1 }
                                }}>
                                    <Image
                                        source={require('../../assets/icons/menu.png')}
                                        style={{ width: 25, height: 20, marginLeft: '10%', tintColor: 'white' }}
                                    /></Link>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.headerText}>Others</Text>
                        </View>
                    </View>

                </View>




                {/* 文字欄 */}
                {
                    othersData.length > 0 ?
                        othersData.map((othersItem, index) => (

                            <View key={index} style={{
                                marginVertical: 10,
                                padding: 5,
                                width: 320,
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderRadius: 12
                            }}>

                                <View style={{ flexDirection: 'column' }}>
                                    <TouchableOpacity onPress={() => Linking.openURL(othersItem.url)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                source={require('../../assets/icons/link.png')}
                                                style={{ width: 17, height: 17, marginLeft: 10, marginTop: 10, tintColor: 'white' }}
                                            />
                                            <Text style={{ width: 250, fontWeight: 'bold', marginLeft: 10, marginTop: 5 }}>
                                                {othersItem.title}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>

                                </View>
                            </View>
                        )) : <Text>No news data available</Text>
                }

            </View>

        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    headContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    headArea: {
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        width: "100%",
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        display: 'flex',
        marginTop: 0,
        color: 'white'
    }
})
