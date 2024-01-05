import { Text, TextInput } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
import { Image, StyleSheet } from 'react-native';
import { useState } from "react";

export default function Home() {

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
                    <View style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBotton: 10,
                        height: '100%',
                        borderRadius: 8,
                        width: 300
                    }}>
                        
                        <View style={{ width: 300, height: 80, marginRight: 5, marginTop: 5 }}>
                            <View style={{ width: '100%' }}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color:'black', fontWeight:'bold'}}>Leads team with 36 points</Text>
                            </View>
                            <View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 12, color:'black' }}>Curry amassed 36 points (12-20 FG, 4-9 3Pt, 8-11 FT), two rebounds, six assists, one block and four steals across 35 minutes during Tuesday's 121-115 win over the Magic.</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, color:'black' }}>01/03/2024, 2:31 PM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBotton: 10,
                        height: '100%',
                        borderRadius: 8,
                        width: 300
                    }}>
                        <View style={{ width: 300, height: 80, marginRight: 5, marginTop: 5 }}>
                            <View style={{ width: '100%' }}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color:'black', fontWeight:'bold'}}>Logs 25 points in loss</Text>
                            </View>
                            <View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 12, color:'black' }}>Curry had 25 points (9-25 FG, 6-15 3Pt, 1-1 FT), two rebounds, seven assists and one steal over 34 minutes during Saturday's 132-122 loss to the Mavericks</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, color:'black' }}>12/31/2023, 3:42 PM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBotton: 10,
                        height: '100%',
                        borderRadius: 8,
                        width: 300
                    }}>
                        <View style={{ width: 300, height: 80, marginRight: 5, marginTop: 5 }}>
                            <View style={{ width: '100%' }}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color:'black', fontWeight:'bold'}}>Shooting struggles continue</Text>
                            </View>
                            <View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 12, color:'black' }}>Curry ended with 13 points (3-15 FG, 2-8 3Pt, 5-6 FT), four rebounds, five assists, one block and two steals across 32 minutes during Thursday's 114-102 loss to the Heat.</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12 }}>12/29/2023, 5:13 PM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBotton: 10,
                        height: '100%',
                        borderRadius: 8,
                        width: 300
                    }}>
                        <View style={{ width: 300, height: 80, marginRight: 5, marginTop: 5 }}>
                            <View style={{ width: '100%' }}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color:'black', fontWeight:'bold'}}>Posts 27 points in victory</Text>
                            </View>
                            <View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 12, color:'black' }}>Curry racked up 27 points (11-18 FG, 2-7 3Pt, 3-3 FT), three rebounds and two assists over 30 minutes during Saturday's 126-106 victory over the Trail Blazers.</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, color:'black' }}>12/24/2023, 4:53 AM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBotton: 10,
                        height: '100%',
                        borderRadius: 8,
                        width: 300
                    }}>
                        <View style={{ width: 300, height: 80, marginRight: 5, marginTop: 5 }}>
                            <View style={{ width: '100%' }}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, color:'black', fontWeight:'bold'}}>Season high from three in victory</Text>
                            </View>
                            <View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 12, color:'black' }}>Curry had 30 points (9-18 FG, 8-13 3Pt, 4-5 FT), four rebounds, seven assists and one block across 27 minutes during Friday's 129-118 win over the Wizards.</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, color:'black' }}>12/23/2023, 5:22 PM</Text>
                            </View>
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
        color: 'white'
    }
})
