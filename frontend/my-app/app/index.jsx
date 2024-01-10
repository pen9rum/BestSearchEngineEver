import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { Link, Tabs } from "expo-router";
import { Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from "react";
import { getHomePageLink, searchFullname } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {
    const [links, setLinks] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [searchResult, setSearchResult] = useState('');



    useEffect(() => {
        getHomePageLink()
            .then(data => {
                console.log("Received data:", data);
                console.log(data[0].photoSrc)
                setLinks(data);

            })
            .catch(error => {
                console.error('Error fetching links:', error);

            });
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchInputValue) {
                searchFullname(searchInputValue).then(resultArray => {
                    // 在这里，resultArray 将是 Promise 解析后的结果，即 String[]

                    const processedResults = resultArray.map(name => JSON.parse(name));
                    console.log(processedResults); // 这应该是您要的 String[]

                    setSearchResult(processedResults); // 将处理后的字符串数组设置到状态中
                }).catch(error => {
                    console.error('Error fetching results:', error);
                });

            } else {
                setSearchResult([]);
            }
        }, 1000); // 1000毫秒的防抖时间

        return () => clearTimeout(delayDebounce);
    }, [searchInputValue]);


    const handlePlayerPress = async (playerName) => {
        try {
            await AsyncStorage.setItem('playerName', playerName);
            navigation.navigate('/NBA/result');
        } catch (error) {
            console.error(error); // handle any errors
        }
    };


    return (
        <ImageBackground
            style={{
                flex: 1
            }}>
            <Tabs.Screen options={{
                title: "NBAFinder",
            }} />
            <View style={{
                width: '100%',
                height: '100%',
                flex: 1,
                justifyContent: "flex-start",
                alignItems: 'center',
                backgroundColor: '#001F3F',
            }}>


                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'flex-start',
                    alignItems: "center",
                    width: 330
                }}>
                    <View style={styles.container}>
                        <View style={styles.headArea}>
                            <Image
                                source={require('../assets/icons/close.png')}
                                style={{ width: 17, height: 17, marginRight: '10%', tintColor: '#001F3F' }}
                            />
                            <Image
                                source={require('../assets/icons/menu.png')}
                                style={{ width: 25, height: 20, marginLeft: '10%', tintColor: '#001F3F' }}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Welcome to NBAFinder !{'\n'}Let's start your NBA journey.</Text>
                    </View>

                    {/* 搜尋欄 */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={{
                                flex: 1,
                                backgroundColor: "rgb(215 215 215)",
                                height: "100%",
                                fontSize: 14,
                                borderRadius: 6,
                                borderWidth: 0,
                            }}
                            placeholder={"Let's search for players"}
                            placeholderTextColor={"black"}
                            value={searchInputValue}
                            onChangeText={setSearchInputValue}
                        />
                    </View>


                </View>

                {/* 球员名字列表 */}
                {searchInputValue && searchResult.length > 0 && (
                    <ScrollView>
                        {searchResult.map((playerName, index) => (
                            <TouchableOpacity key={index} onPress={() => handlePlayerPress(playerName)} style={styles.playerWrapper}>
                                <Text style={styles.playerWrapper}>
                                    {playerName}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}


                {/* 新聞欄 */}
                {!(searchInputValue && searchResult.length > 0) && (
                    <View style={styles.newsContainer}>
                        <Text style={{ fontWeight: 'bold', marginTop: 10, color: 'white' }}>Today's Focus</Text>
                        <Link href={{
                            pathname: 'https://www.nba.com' + links[0]?.absHrefValue || 'https://www.nba.com/news/power-rankings-2023-24-week-11',
                            query: { type: 1 }
                        }}>
                            {/* Content of the link goes here */}


                            <View style={styles.newsWrapper}>
                                <View style={{ width: 100, height: 80 }}>
                                    <Image
                                        source={{ uri: links[0]?.photoSrc || require('../assets/pic/news1.jpeg') }}
                                        style={{ width: 90, height: 70, margin: 5 }}
                                    />
                                </View>
                                <View style={{ width: 180, height: 80, marginRight: 5, marginTop: 5 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color: 'black' }}> {links[0]?.title || "POWER RANKINGS: THUNDER, CLIPPERS SURGING"}</Text>
                                    </View>
                                    <View>
                                        <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 11 }}>{links[0]?.content || "To open 2024, the Clippers and Thunder are soaring while the Celtics continue to hold down No. 1."}</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ fontSize: 12 }}>22 hours ago</Text>
                                    </View>
                                </View>
                            </View>
                        </Link>
                        <Link href={{
                            pathname: 'https://www.nba.com' + links[1]?.absHrefValue || 'https://www.nba.com/news/power-rankings-2023-24-week-11',
                            query: { type: 1 }
                        }}>
                            <View style={styles.newsWrapper}>
                                <View style={{ width: 100, height: 80 }}>
                                    <Image
                                        source={{ uri: links[1]?.photoSrc || require('../assets/pic/news2.jpg') }}
                                        style={{ width: 90, height: 70, margin: 5 }}
                                    />
                                </View>
                                <View style={{ width: 180, height: 80, marginRight: 5, marginTop: 5 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color: 'black' }}>{links[1]?.title || "STARTING 5: PORZINGIS VS. HOLMGREN SHOWDOWN LOOMS"}</Text>
                                    </View>
                                    <View>
                                        <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 11 }}>{links[1]?.content || "Jordan Clarkson has a night to remember in SLC, plus a showdown of two 'unicorn' players in Oklahoma City awaits."}</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ fontSize: 12 }}>January 2, 2024</Text>
                                    </View>
                                </View>
                            </View>
                        </Link>
                        <Link href={{
                            pathname: 'https://www.nba.com' + links[2]?.absHrefValue || 'https://www.nba.com/news/nba-fantasy-start-sit-guide-for-week-11',
                            query: { type: 1 }
                        }}>
                            <View style={styles.newsWrapper}>
                                <View style={{ width: 100, height: 80 }}>
                                    <Image
                                        source={{ uri: links[2]?.photoSrc || require('../assets/pic/news3.png') }}
                                        style={{ width: 90, height: 70, margin: 5 }}
                                    />
                                </View>
                                <View style={{ width: 180, height: 80, marginRight: 5, marginTop: 5 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color: 'black' }}>{links[2]?.title || "NBA Fantasy: Start/Sit guide for Week 11"}</Text>
                                    </View>
                                    <View>
                                        <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 11 }}>{links[2]?.content || "RotoWire discusses the best players to start at each position heading into Week 11 of the fantasy basketball season."}</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ fontSize: 12 }}>December 31, 2023</Text>
                                    </View>
                                </View>
                            </View>
                        </Link>

                    </View>
                )}

            </View>

        </ImageBackground >

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
        color: 'white',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 8,
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
    backGroundImage: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
    },
    searchContainer: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5,
        height: 30,
        backgroundColor: "rgb(215 215 215)",
        borderRadius: 16,
        width: 280,
    },
    newsContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
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
    },
    playerContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
    },
    playerWrapper: {
        marginTop: 10,
        backgroundColor: "#4F577D",
        borderRadius: 8,
        width: 200,
        height: 35,
        textAlign: 'center',
    },
})
