import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
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
                            <Link href={{
                                pathname: '',
                                query: { type: 1 }
                            }}>
                                <Image
                                    source={require('../../assets/icons/close.png')}
                                    style={{ width: 17, height: 17, marginRight: '10%', tintColor: 'white' }}
                                />
                            </Link>
                            <Image
                                source={require('../../assets/icons/menu.png')}
                                style={{ width: 25, height: 20, marginLeft: '10%', tintColor: '#001F3F' }}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Welcome to NBAFinder !{'\n'}Let's start your NBA journey.</Text>
                    </View>

                    {/* 搜尋欄 */}
                    <View style={styles.searchContainer}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            width: '100%'
                        }}>
                            <TextInput
                                style={{
                                    flex: 1,
                                    backgroundColor: "rgb(215 215 215)",
                                    height: "100%",
                                    fontSize: 14,
                                    marginLeft: '10%'
                                }}
                                onChangeText={setName}
                                placeholder={"player's name"}
                                placeholderTextColor={"black"}
                                value={name}
                                textContentType={'name'}
                            />
                            <Image
                                source={require('../../assets/icons/search.png')}
                                style={{ width: 25, height: 25, marginRight: '5%' }}
                            />
                        </View>
                    </View>
                </View>

                {/* 球員選單 */}
                <View style={styles.playerContainer}>
                    <View style={styles.playerWrapper}>
                        <View style={{ width: 100, height: 80 }}>
                            <Image
                                source={require('../../assets/icons/news.jpg')}
                                style={{ width: 90, height: 70, margin: 5 }}
                            />
                        </View>
                        <View style={{ width: 180, height: 80, marginRight: 5, marginTop: 5 }}>
                            <Text style={{ fontSize: 16 }}>qwertyuiopasdfghjklzxcvbnm</Text>
                        </View>
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
        borderRadius: 16
    },
    playerContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
    },
    playerWrapper: {
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
