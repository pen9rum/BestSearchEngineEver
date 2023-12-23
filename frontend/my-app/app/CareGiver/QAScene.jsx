import {View, Text, ScrollView, Image} from "react-native";
import styles from "./QAScene_Style";
import * as React from 'react';
import {List, TextInput, IconButton, MD3Colors} from 'react-native-paper';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import {Stack} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Recording from "../CareRecipient/Recording";
import {useState} from "react";
import {Audio} from "expo-av";
import {readAsStringAsync} from "expo-file-system/build/FileSystem";
import {EncodingType} from "expo-file-system";
import {Buffer} from "buffer";
import {api} from "../utils";

const QAApp = () => {
    const [question, setQuestion] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [data, setData] = React.useState([]);

    const loadData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('QAData');
            if (storedData !== null) {
                setData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const saveData = async () => {
        try {
            const newData = [...data, {question, answer}];
            await AsyncStorage.setItem('QAData', JSON.stringify(newData));
            setData(newData);
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="提問"
                    value={question}
                    onChangeText={setQuestion}
                />
                <TextInput
                    style={styles.input}
                    placeholder="回答（請語音 或 文字 輸入"
                    value={answer}
                    onChangeText={setAnswer}
                />
                <Button title="儲存" onPress={saveData}/>
            </View>
            {data.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Text>{`Q: ${item.question}`}</Text>
                    <Text>{`A: ${item.answer}`}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const NOT_STARTED = 0;
const RECORDING = 1;
const STOPPED = 2;

const QAScene = () => {
    const [expanded, setExpanded] = React.useState(true);
    const [selectedItems, setSelectedItems] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const [answerState, setAnswerState] = useState(NOT_STARTED);
    const [answerRecording, setAnswerRecording] = useState(undefined);

    const [questionState, setQuestionState] = useState(NOT_STARTED);
    const [questionRecording, setQuestionRecording] = useState(undefined);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);


    async function startRecording() {
        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const {recording} = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                setAnswerState(RECORDING)
                setAnswerRecording(recording);
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function stopRecording() {
        await answerRecording.stopAndUnloadAsync();
        const {sound, status} = await answerRecording.createNewLoadedSoundAsync();
        setAnswerRecording([sound, answerRecording.getURI()]);
        setAnswerState(STOPPED)
    }

    async function q_startRecording() {
        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const {recording} = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                setQuestionState(RECORDING)
                setQuestionRecording(recording);
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function q_stopRecording() {
        await questionRecording.stopAndUnloadAsync();
        const {sound, status} = await questionRecording.createNewLoadedSoundAsync();
        setQuestionRecording([sound, questionRecording.getURI()]);
        setQuestionState(STOPPED)
    }

    const upload = async () => {
        console.log(answerRecording[1])
        const answer = await readAsStringAsync(
            answerRecording[1],
            {
                encoding: EncodingType.Base64,
            }
        );
        console.log(answer)
        console.log(questionRecording[0])
        const question = await readAsStringAsync(
            questionRecording[1],
            {
                encoding: EncodingType.Base64,
            }
        );
        console.log(question === answer)

        const formData = new FormData();

        formData.append("answer", answer);
        formData.append("question", question);

        api("POST", "/upload", formData)
            .then(res => {
                alert(res.message)
            })
    }


    return (
        <PaperProvider>
            <Menu
                style={styles.menuContainer}
                visible={visible}
                onDismiss={closeMenu}
                anchor={{x: 0, y: 0}}
            >
                <List.Section style={styles.list}>
                    <List.Accordion
                        title="已回答"
                        left={props => <List.Icon {...props} icon="folder"/>}
                        onPress={() => {
                            setExpanded(!expanded)
                        }}>
                        <List.Item title="我吃午餐了嗎?" onPress={() => {
                            setSelectedItems('我吃午餐了嗎？');
                            setExpanded(!expanded);
                            closeMenu()
                        }}/>
                        <List.Item title="我的名字是什麼?" onPress={() => {
                            setSelectedItems("我的名字是什麼?");
                            setExpanded(!expanded);
                            closeMenu()
                        }}/>
                    </List.Accordion>

                    <List.Accordion
                        title="尚未回答"
                        left={props => <List.Icon {...props} icon="folder"/>}
                        onPress={() => setExpanded(!expanded)}>
                        <List.Item title="我是誰?" onPress={() => {
                            setSelectedItems('我是誰?');
                            setExpanded(!expanded);
                            closeMenu()
                        }}/>
                        <List.Item title="我來過這裡嗎?" onPress={() => {
                            setSelectedItems('我來過這裡嗎?');
                            setExpanded(!expanded);
                            closeMenu()
                        }}/>
                    </List.Accordion>
                </List.Section>
            </Menu>
            <View style={styles.container}>
                <View style={styles.QAarea}>
                    <View style={styles.Qitem}>
                        <IconButton
                            icon={'account'}
                            mode={'contained'}
                            size={20}
                            onPress={() => console.log('Pressed')}
                            disabled={false}
                        />
                        <TextInput
                            label="問問題..."
                            value={selectedItems}
                            style={styles.textInput}
                            onChangeText={text => setSelectedItems(text)}
                        />

                        {
                            questionState === NOT_STARTED ? (
                                <IconButton icon="record-circle"
                                            iconColor={MD3Colors.error50}
                                            size={20}
                                            color="black"
                                            onPress={q_startRecording}/>
                            ) : questionState === RECORDING ? (
                                <IconButton icon="stop"
                                            iconColor={MD3Colors.error50}
                                            size={20}
                                            color="black"
                                            onPress={q_stopRecording}/>
                            ) : (
                                <IconButton icon="play" iconColor={MD3Colors.error50}
                                            size={20}
                                            onPress={() => questionRecording[0].replayAsync()}/>
                            )
                        }
                    </View>
                    <View style={styles.Aitem}>
                        <IconButton
                            icon={'account'}
                            mode={'contained'}
                            size={20}
                            onPress={() => console.log('Pressed')}
                            disabled={selectedItems === ''}
                        />

                        {
                            answerState === NOT_STARTED || answerState === RECORDING ? (
                                <IconButton icon={answerState === RECORDING ? "stop" : "microphone"}
                                            iconColor={MD3Colors.error50}
                                            size={50}
                                            color="black"
                                            onPress={answerState === RECORDING ? stopRecording : startRecording}/>
                            ) : (
                                <IconButton icon="play" iconColor={MD3Colors.error50}
                                            size={50}
                                            onPress={() => answerRecording[0].replayAsync()}/>
                            )
                        }

                    </View>
                </View>
                <Button onPress={upload}>新增問題</Button>
            </View>


            <Stack.Screen
                options={{
                    headerTitle: "看護",
                    headerRight: () => <IconButton
                        icon="menu"
                        onPress={() => {
                            visible ? closeMenu() : openMenu()
                        }}
                    />,
                }}
            />
        </PaperProvider>
    );
};

export default QAScene;