import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const [type, setType] = useState(0);

    const [infoData, setInfoData] = useState([]);

    useEffect(() => {
        const fetchGoogleSearchData = async () => {
            try {
                const storedPlayerInfoData = await AsyncStorage.getItem('PlayerInfoData');
                if (storedPlayerInfoData) {
                    setInfoData(JSON.parse(storedPlayerInfoData));
                }
                console.log(storedPlayerInfoData)
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
                                    />
                                </Link>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.headerText}>Player's Bio</Text>
                        </View>
                    </View>

                </View>
                {/* 文字欄 */}
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 31, 63, 0.8)',
                }}>
                    <View style={{
                        marginVertical: 10,
                        padding: 5,
                        width: 320,
                        borderRadius: 12,
                        marginLeft: '39%'
                    }}>

                        {
                            infoData.length > 0 ?
                                infoData.map((infoItem, index) => (
                                    <View key={index} style={styles.newsWrapper}>
                                        <TouchableOpacity onPress={() => Linking.openURL(infoItem.url)}>
                                            <View style={{ width: '100%', height: 'auto' }}> {/* 调整高度为 'auto' */}
                                                <Text
                                                    ellipsizeMode="tail"
                                                    style={{
                                                        fontSize: 16,
                                                        color: 'black',
                                                        textAlign: 'center',
                                                        marginVertical: 20,
                                                        flexWrap: 'wrap' // 添加换行
                                                    }}
                                                    numberOfLines={2} // 例如最多显示2行
                                                >
                                                    {infoItem.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )) : <Text>No news data available</Text>

                        }



                    </View>
                </View>
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
    },
    customFontText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 12,
        fontSize: 24,
        fontFamily: 'DM Sans-Regular',
    },
    newsWrapper: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
        height: 100,
        backgroundColor: "#4F577D",
        borderRadius: 8,
        width: 300
    }
})

