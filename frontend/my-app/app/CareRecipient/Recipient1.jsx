import * as React from 'react'
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import {useState} from "react";
import {router, Stack} from 'expo-router';
import Recording from './Recording';
import {List, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {Button, IconButton} from 'react-native-paper';
import {api} from "../utils";

const Recipient1 = () => {
    const [isDisabled1, setDisabled1] = useState(false);
    const [isDisabled2, setDisabled2] = useState(false);
    const [isDisabled3, setDisabled3] = useState(false);
    const [isDisabled4, setDisabled4] = useState(false);

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
                gap: 12,
            }}>
                <Button onPress={EMR}>
                    <Card>
                        <Text style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: 12,
                            fontSize: 24,
                        }}>Assistance</Text>
                        <Card.Content style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Icon name="man" size={50} color="black"/>
                        </Card.Content>
                    </Card>
                </Button>

                <Card>
                    <Recording/>
                </Card>
            </View>
            <ScrollView >
                    <List.Section>

                        <Card.Actions style={styles.card}>
                            <IconButton style={styles.button} disabled={isDisabled2} icon="rice" size = {130} onPress={() => setDisabled2(true)}/>
                            <Text style={isDisabled1 ? styles.able : styles.disable }>Wake Up</Text>
                        </Card.Actions>

                        <Card.Actions style={styles.card}>
                            <IconButton style={styles.button} disabled={isDisabled3} icon="rice" size = {130} onPress={() => setDisabled3(true)}/>
                            <Text style={isDisabled1 ? styles.able : styles.disable }>Wake Up</Text>
                        </Card.Actions>

                        <Card.Actions style={styles.card}>
                            <IconButton style={styles.button} disabled={isDisabled4} icon="pill" size={130} onPress={() => setDisabled4(true)}/>
                            <Text style={isDisabled1 ? styles.able : styles.disable }>Wake Up</Text>
                        </Card.Actions>

                        <Card.Actions style={styles.card}>
                          <IconButton style={styles.button} disabled={'true'} icon="bed-king" size = {130} onPress={() => setDisabled1(true)}/>
                          <Text style={isDisabled1 ? styles.able : styles.disable }>Wake Up</Text>
                        </Card.Actions>
                    </List.Section>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Recipient1

const styles = StyleSheet.create({
        card: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        },
        able:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: 12,
            fontSize: 20
            //margin-bottom
        }, 
        disable: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: 12,
            fontSize: 24,
            color: 'light-gray'
        },
        button:{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
          height: 130,
          width: 130
        }
    }
)