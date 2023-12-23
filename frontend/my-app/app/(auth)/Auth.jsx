import {View, Text, Image, ImageBackground} from "react-native";
import {Link, Tabs} from "expo-router";
import {Card} from "react-native-paper";
import {useNavigation, useRouter, useLocalSearchParams} from "expo-router";


export default function Auth() {
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const {type} = params;

    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground
                source={require("../../assets/pic/joinUs.png")}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                <Tabs.Screen options={{
                    title: "記憶傳承人",
                }}/>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 60,
                }}>
                    <Link href={{
                        pathname: '/Login',
                        query: {type: type}
                    }}>
                        <Card
                            style={{
                                display: 'flex',
                                marginTop: 100,
                            }}
                        >
                            <Text style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: 12,
                                fontSize: 24,
                            }}>我有帳號</Text>
                            <Card.Content style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={require("../../assets/icons/hackathon_icon/log-in.png")}
                                    style={{width: 50, height: 50}}
                                />
                            </Card.Content>
                        </Card>
                    </Link>

                    <Link href={{
                        pathname: '/Register',
                        query: {type: type}
                    }}>
                        <Card
                            style={{
                                display: 'flex',
                                marginTop: 100,
                            }}
                        >
                            <Text style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: 12,
                                fontSize: 24,
                            }}>我是訪客</Text>
                            <Card.Content style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={require("../../assets/icons/hackathon_icon/sign-up.png")}
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