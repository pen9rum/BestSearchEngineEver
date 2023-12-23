import React from 'react'
import {View, ScrollView, SafeAreaView, Text, Button,} from 'react-native';
import {Stack, useRouter} from 'expo-router';
import {Audio} from 'expo-av';
import {Buffer} from "buffer";
import {IconButton, MD3Colors} from 'react-native-paper';
import {readAsStringAsync} from "expo-file-system/build/FileSystem";
import {EncodingType} from "expo-file-system";
import {api} from "../utils";


const Recording = () => {
    const router = useRouter;
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);

    const recordingOptions = {
        // android not currently in use, but parameters are required
        android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
        },
        ios: {
            extension: '.wav',
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
    };

    /*async function getTranscription() {
     const fs = require('fs');

     // Imports the Google Cloud client library
     const speech = require('@google-cloud/speech');

     // Creates a client
     const client = new speech.SpeechClient();

     const filename = recording.getURI();
     // const encoding = 'Encoding of the audio file, e.g. LINEAR16';
     const sampleRateHertz = 16000;
     const languageCode = 'en-US';

     const request = {
       config: {
         //encoding: encoding,
         sampleRateHertz: sampleRateHertz,
         languageCode: languageCode,
       },
       interimResults: false, // If you want interim results, set this to true
     };

     // Stream the audio to the Google Cloud Speech API
     const recognizeStream = client
       .streamingRecognize(request)
       .on('error', console.error)
       .on('data', data => {
         console.log(
           `Transcription: ${data.results[0].alternatives[0].transcript}`
         );
       });

     // Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
     fs.createReadStream(filename).pipe(recognizeStream);
       }*/

    async function startRecording() {

        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const {recording} = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                setRecording(recording);
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function stopRecording() {
        await recording.stopAndUnloadAsync();
        setRecording(undefined);

        let allRecordings = [...recordings];
        const {sound, status} = await recording.createNewLoadedSoundAsync();

        allRecordings.push({
            sound: sound,
            file: recording.getURI()
        });
        setRecordings(allRecordings);
        // { getTranscription() };
    }

    const upload = async file_input => {
        const recordingUri = file_input.file;
        const recordingBase64 = await readAsStringAsync(
            recordingUri,
            {
                encoding: EncodingType.Base64,
            }
        );

        const buffer = Buffer.from(recordingBase64, "base64")
        const blob = new Blob([buffer], {type: 'audio/mp4'})
        const file = new File([blob], 'test.mp4', {type: 'audio/mp4'})

        const formData = new FormData();
        formData.append('file', file);

        api("POST", "/upload", formData)
            .then(res=>{
                alert(res)
            })
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index}>
                    <IconButton icon="play" iconColor={MD3Colors.error50} size={20}
                                onPress={() => recordingLine.sound.replayAsync()}/>
                    <IconButton icon="upload" iconColor={MD3Colors.error50} size={20}
                                onPress={() => upload(recordingLine)}/>
                </View>
            );
        });
    }

    function clearRecordings() {
        setRecordings([])
    }

    return (
        <SafeAreaView>
            <Stack.Screen/>
            <ScrollView ShowsVerticalScrollIndicator={false}>
                <View>
                    <IconButton icon={recording ? "stop" : "microphone"} iconColor={MD3Colors.error50} size={50}
                                color="black" onPress={recording ? stopRecording : startRecording}/>
                    {getRecordingLines()}
                    <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecordings}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Recording