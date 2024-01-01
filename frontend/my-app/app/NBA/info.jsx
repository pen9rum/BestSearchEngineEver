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
                    width: 330,
                }}>
                    <View style={{backgroundColor: 'black',
                        width: '100%'
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
                                style={{ width: 25, height: 20, marginLeft: '10%', tintColor: 'white' }}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Player' Info</Text>
                    </View>
                    </View>
                    {/* 文字欄 */}
                    
                    
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
    customFontText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 12,
        fontSize: 24,
        fontFamily: 'DM Sans-Regular',
    }
})
