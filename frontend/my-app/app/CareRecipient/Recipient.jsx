import * as React from 'react'
import {View, TouchableOpacity, ScrollView, SafeAreaView, Text, StyleSheet, Image} from 'react-native';
import {useEffect, useState} from "react";
import {router, Stack} from 'expo-router';
import Recording from './Recording';
import {List, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {Button, IconButton} from 'react-native-paper';
import {api} from "../utils";
import {icons} from '../../constants';

const Recipient = () => {
    const [isDisabled1, setDisabled1] = useState(false);
    const [isDisabled2, setDisabled2] = useState(false);
    const [isDisabled3, setDisabled3] = useState(false);
    const [isDisabled4, setDisabled4] = useState(false);

    useEffect(() => {
        api("GET", '/temp', {}).then(res => {
            if (res.data.WakeUp) setDisabled1(true);
            if (res.data.Lunch) setDisabled2(true);
            if (res.data.Dinner) setDisabled3(true);
            if (res.data.Medicine) setDisabled4(true);

        })
    }, []);

    function disable_set1() {
        if (isDisabled2 && isDisabled3 && isDisabled4) {
            setDisabled1(false);
            setDisabled2(false);
            setDisabled3(false);
            setDisabled4(false);
        } else setDisabled1(true);

        api("POST", "/temp", {
            "WakeUp": true
        }).then(res => {
        })
    }

    function disable_set2() {
        if (isDisabled1 && isDisabled3 && isDisabled4) {
            setDisabled1(false);
            setDisabled2(false);
            setDisabled3(false);
            setDisabled4(false);
        } else setDisabled2(true);

        api("POST", "/temp", {
            "Lunch": true
        }).then(res => {
        })
    }

    function disable_set3() {
        if (isDisabled1 && isDisabled2 && isDisabled4) {
            setDisabled1(false);
            setDisabled2(false);
            setDisabled3(false);
            setDisabled4(false);
        } else setDisabled3(true);

        api("POST", "/temp", {
            "Dinner": true
        }).then(res => {
        })
    }

    function disable_set4() {
        if (isDisabled1 && isDisabled2 && isDisabled3) {
            setDisabled1(false);
            setDisabled2(false);
            setDisabled3(false);
            setDisabled4(false);
        } else setDisabled4(true);

        api("POST", "/temp", {
            "Medicine": true
        }).then(res => {
        })
    }

    const EMR = () => {
        api("POST", "/notify", {}).then(res => {
            alert("已通知照護人")
        })
    }

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    title: "患者介面",
                }}
            />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: 25,
            }}>
                <Button onPress={EMR}>
                    <Card
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            height: 120,
                            backgroundColor: '#faf0e6'
                        }}
                    >
                        <Card.Content style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                        }}>
                            <Icon name="man" size={50} color="black"
                                  style={{
                                      marginTop: 15,
                                  }}
                            />
                            <Text style={{
                                marginTop: 30,
                                fontSize: 24,
                            }}>呼叫看護</Text>
                        </Card.Content>
                    </Card>
                </Button>

                <Card style={{
                    backgroundColor: '#faf0e6'
                }}
                >
                    <Recording/>
                </Card>
            </View>
            <ScrollView>
                <List.Section>

                    <TouchableOpacity
                        onPress={disable_set1}
                        disabled={isDisabled1}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#fff8dc',
                            marginLeft: 20,
                            marginRight: 20,
                            height: 100,
                        }}
                    >
                        <Image source={icons.wakeup}
                               style={{
                                   width: 60,
                                   height: 60,
                                   marginTop: 15,
                                   marginLeft: 30,
                               }}
                        />
                        <Text style={isDisabled1 ? styles.textDisable : styles.textAble}>起床</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={disable_set2}
                        disabled={isDisabled2}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#fff8dc',
                            marginTop: 20,
                            marginLeft: 20,
                            marginRight: 20,
                            height: 100,
                        }}
                    >
                        <Image source={icons.meal}
                               style={{
                                   width: 60,
                                   height: 60,
                                   marginTop: 15,
                                   marginLeft: 30,
                               }}
                        />
                        <Text style={isDisabled2 ? styles.textDisable : styles.textAble}>午餐</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={disable_set3}
                        disabled={isDisabled3}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#fff8dc',
                            marginTop: 20,
                            marginLeft: 20,
                            marginRight: 20,
                            height: 100,
                        }}
                    >
                        <Image source={icons.meal}
                               style={{
                                   width: 60,
                                   height: 60,
                                   marginTop: 15,
                                   marginLeft: 30,
                               }}
                        />
                        <Text style={isDisabled3 ? styles.textDisable : styles.textAble}>晚餐</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={disable_set4}
                        disabled={isDisabled4}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#fff8dc',
                            marginTop: 20,
                            marginLeft: 20,
                            marginRight: 20,
                            height: 100,
                        }}
                    >
                        <Image source={icons.medicine}
                               style={{
                                   width: 60,
                                   height: 60,
                                   marginTop: 15,
                                   marginLeft: 30,
                               }}
                        />
                        <Text style={isDisabled4 ? styles.textDisable : styles.textAble}>吃藥</Text>

                    </TouchableOpacity>

                </List.Section>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Recipient;

const styles = StyleSheet.create(
    {
        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
                '#faf0e6',
            gap: 10,
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 25
        },
        textAble: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginLeft: 30,
            fontSize: 24
        },
        textDisable: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginLeft: 30,
            fontSize: 24,
            color: '#dcdcdc'
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
            height: 130,
            width: 130
        }
    }
)