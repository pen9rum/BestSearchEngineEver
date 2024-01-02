import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
import { Card, Icon, MD3Colors } from "react-native-paper";
import { Image, StyleSheet } from 'react-native';
import { useState } from "react";

export default function Home() {
    const [type, setType] = useState(0);

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
                        <Link href={{
                            pathname: '/NBA/search',
                            query: { type: 1 }
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-between",
                                width: 250,
                                
                            }}>
                                <TextInput
                                    style={{
                                        flex: 1,
                                        backgroundColor: "rgb(215 215 215)",
                                        height: "100%",
                                        fontSize: 14
                                    }}
                                    placeholder={"Let's search for players"}
                                    placeholderTextColor={"black"}
                                    
                                />
                                <Image
                                    source={require('../assets/icons/search.png')}
                                    style={{ width: 25, height: 25 }}
                                />
                            </View>
                        </Link>
                    </View>
                </View>

                {/* 新聞欄 */}
                <View style={styles.newsContainer}>
                    <Text style={{ fontWeight: 'bold' }}>Today's Focus</Text>
                    <View style={styles.newsWrapper}>
                        <View style={{ width: 100, height: 80 }}>
                            <Image
                                source={require('../assets/icons/news.jpg')}
                                style={{ width: 90, height: 70, margin: 5 }}
                            />
                        </View>
                        <View style={{ width: 180, height: 80, marginRight: 5, marginTop: 5 }}>
                            <Text style={{ fontSize: 16 }}>qwertyuiopasdfghjklzxcvbnm</Text>
                        </View>
                    </View>
                    <View style={styles.newsWrapper}>
                        <View style={{ width: 100, height: 80 }}>
                            <Image
                                source={require('../assets/icons/news.jpg')}
                                style={{ width: 90, height: 70, margin: 5 }}
                            />
                        </View>
                        <View style={{ width: 180, height: 80, marginRight: 5, marginTop: 5 }}>
                            <Text style={{ fontSize: 16 }}>qwertyuiopasdfghjklzxcvbnm</Text>
                        </View>
                    </View>
                    <View style={styles.newsWrapper}>
                        <View style={{ width: 100, height: 80 }}>
                            <Image
                                source={require('../assets/icons/news.jpg')}
                                style={{ width: 90, height: 70, margin: 5 }}
                            />
                        </View>
                        <View style={{ width: 180, height: 80, marginRight: 5, marginTop: 5 }}>
                            <Text style={{ fontSize: 16 }}>qwertyuiopasdfghjklzxcvbnm</Text>
                        </View>
                    </View>
                </View>

                {/*參考用
                <Link href={{
                    pathname: '/Auth',
                    query: { type: 1 }
                }}>
                    <Card
                        style={{
                            display: 'flex',
                            marginTop: 100,
                        }}
                    >
                        <Text style={styles.customFontText}>我是看護</Text>
                        <Card.Content style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image
                                source={require("../assets/icons/hackathon_icon/caregiver.png")}
                                style={{ width: 50, height: 50 }}
                            />
                        </Card.Content>
                    </Card>
                </Link>*/}
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
        width: 280
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
        marginTop: 10,
        height: 70,
        backgroundColor: "#4F577D",
        borderRadius: 8,
        width: 300
    }
})
