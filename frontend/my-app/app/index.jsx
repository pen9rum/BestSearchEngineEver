import {Text} from "react-native-paper";
import {View, ImageBackground} from "react-native";
import {Link, Tabs} from "expo-router";
import {Card, Icon, MD3Colors} from "react-native-paper";
import {Image, StyleSheet} from 'react-native';
import {useState} from "react";

export default function Home() {
    const [type, setType] = useState(0);
    return (
        <View style={{
            flex:1
        }}>
            <Tabs.Screen options={{
                title: "記憶傳承人",
            }}/>
            <ImageBackground
                source={require("../assets/pic/who_am_i.png")}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 60,
                }}>
                    <Link href={{
                        pathname: '/Auth',
                        query: {type: 0}
                    }}>
                        <Card
                            style={{
                                display: 'flex',
                                marginTop: 100,
                            }}
                        >
                            <Text style={styles.customFontText}>我是患者</Text>
                            <Card.Content
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <Image
                                    source={require("../assets/icons/hackathon_icon/patient.png")}
                                    style={{width: 50, height: 50}}
                                />
                            </Card.Content>
                        </Card>
                    </Link>

                    <Link href={{
                        pathname: '/Auth',
                        query: {type: 1}
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
                                    style={{width: 50, height: 50}}
                                />
                            </Card.Content>
                        </Card>
                    </Link>
                </View>
            </ImageBackground>

        </View>

    )
}

const styles = StyleSheet.create({
    customFontText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 12,
        fontSize: 24,
        fontFamily: 'DM Sans-Regular',
    },
    backGroundImage:{
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
    }
})