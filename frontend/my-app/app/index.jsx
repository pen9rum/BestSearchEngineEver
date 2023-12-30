import { Text, TextInput} from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link, Tabs } from "expo-router";
import { Card, Icon, MD3Colors} from "react-native-paper";
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
                    paddingVertical: 20,
                }}>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Welcome to NBAFinder !{'\n'}
                            Search for NBA players...</Text>
                    </View>

                    {/* 搜尋欄 */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchWrapper}>
                            <TextInput onChangeText={setName} placeholder={"Search for players here"} value={name} textContentType={'name'}/>
                        </View>
                    </View> 
                </View>


                {/* 新聞欄 */}
                <View style={styles.container}>

                </View>


                {/*<Link href={{
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
    container: {
        width: "100%",
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        display: 'flex',
        marginTop: 100,
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
        height: 50,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
    },
})
