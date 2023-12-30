import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
import { Card, Icon, MD3Colors } from "react-native-paper";
import { Image, StyleSheet } from 'react-native';
import { useState } from "react";

export default function Home() {
    const [type, setType] = useState(0);
    const [name, setName] = useState('')

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
                    paddingVertical: 10,
                }}>
                    <View style={styles.container}>
                    <View style={styles.headArea}>
                        <Image
                            source={require('../assets/icons/close.png')}
                            style={{ width: 20, height: 20, marginRight: '10%', tintColor: 'white' }}
                        />
                        <Image
                            source={require('../assets/icons/menu.png')}
                            style={{ width: 30, height: 20, marginLeft: '10%', tintColor: 'white' }}
                        />
                    </View>
                </View>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Welcome to NBAFinder !{'\n'}Search for NBA players...</Text>
                    </View>

                    {/* 搜尋欄 */}
                    <View style={styles.searchContainer}>
                        <Link href={{
                            pathname: '/Auth',
                            query: { type: 1 }
                        }}>
                            <TextInput
                                style={styles.searchWrapper}
                                onChangeText={setName}
                                placeholder={"Let's search for players"}
                                placeholderTextColor={"black"}
                                value={name}
                                textContentType={'name'}
                            />

                        </Link>
                        <Image
                            source={require('../assets/icons/search.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </View>
                </View>

                {/* 新聞欄 */}
                <View style={styles.newsContainer}>
                    <Text >Latest News</Text>
                    <View style={styles.newsWrapper}>
                        <View style={{ width: 80, height: 80 }}>
                            <Image
                                source={require('../assets/icons/user.png')}
                                style={{ width: 70, height: 70, margin: 5}}
                            />
                        </View>
                        <View style={{ width: 200, height: 80, margin: 5}}>
                            <Text style={{ fontSize: 18 }}>qwertyuiopasdfghjklzxcvbnm</Text>
                        </View>
                    </View>
                    <View style={styles.newsWrapper}>
                        <View style={{ width: 80, height: 80 }}>
                            <Image
                                source={require('../assets/icons/user.png')}
                                style={{ width: 70, height: 70, margin: 5}}
                            />
                        </View>
                        <View style={{ width: 200, height: 80, margin: 5}}>
                            <Text style={{ fontSize: 18 }}>qwertyuiopasdfghjklzxcvbnm</Text>
                        </View>
                    </View>
                    <View style={styles.newsWrapper}>
                        <View style={{ width: 80, height: 80 }}>
                            <Image
                                source={require('../assets/icons/user.png')}
                                style={{ width: 70, height: 70, margin: 5}}
                            />
                        </View>
                        <View style={{ width: 200, height: 80, margin: 5}}>
                            <Text style={{ fontSize: 18 }}>qwertyuiopasdfghjklzxcvbnm</Text>
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
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5,
        height: 30,
        backgroundColor: "rgb(215 215 215)",
        borderRadius: 16
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: "rgb(215 215 215)",
        marginRight: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height: "100%",
        fontSize: 14
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
