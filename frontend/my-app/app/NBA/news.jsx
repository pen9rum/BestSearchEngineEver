import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
import { Image, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchGoogleSearchData = async () => {
            try {
                const storedNewsData = await AsyncStorage.getItem('NewsData');
                if (storedNewsData) {
                    setNewsData(JSON.parse(storedNewsData));
                }
                console.log(storedNewsData)
            } catch (error) {
                console.error('Error fetching Google Search data from AsyncStorage:', error);
            }
        };

        fetchGoogleSearchData();
    }, []);



    return (
        <ImageBackground
            source={require("../../assets/pic/News.png")}
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
                            <Text style={styles.headerText}>News</Text>
                        </View>
                    </View>

                </View>
                {/* 新聞欄 */}
                <View style={{
                    marginVertical: 10,
                    padding: 5,
                    width: 320,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: 12,
                    alignItems: "center",
                    flexDirection: "column",
                }}>

                    {newsData.length > 0 ?
                        newsData.map((newsItem, index) => (
                            <View key={index} style={{
                                flex: 1,
                                justifyContent: "space-around",
                                alignItems: "center",
                                flexDirection: "row",
                                marginBottom: 10,
                                height: '100%',
                                borderRadius: 8,
                                width: 300
                            }}>
                                <View style={{ width: 300, height: 80, marginRight: 5, marginTop: 5 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                                            {newsItem.title}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 12, color: 'black' }}>
                                            {newsItem.content}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: 'black' }}>{newsItem.date}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                        : <Text>No news data available</Text>
                    }






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
    }
})
