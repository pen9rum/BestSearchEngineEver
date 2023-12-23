//import * as React from 'react';
import {BottomNavigation, PaperProvider} from "react-native-paper";
import {useState} from "react";
import {Tabs} from 'expo-router';
import QAScene from "./QAScene";
import StatusScene from "./StatusScene";
import Settings from "../(auth)/Settings";

const CareGiver = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'status', title: '狀態', focusedIcon: require('../../assets/icons/hackathon_icon/christmas-bell.png'), unfocusedIcon: require('../../assets/icons/hackathon_icon/christmas-bell.png')},
        {key: 'question', title: '問答', focusedIcon: require('../../assets/icons/hackathon_icon/faq.png'), unfocusedIcon: require('../../assets/icons/hackathon_icon/faq.png')},
        {key: 'settings', title: '設定', focusedIcon: require('../../assets/icons/hackathon_icon/settings.png'), unfocusedIcon: require('../../assets/icons/hackathon_icon/settings.png')},
    ]);


    const renderScene = BottomNavigation.SceneMap({
        status: StatusScene,
        question: QAScene,
        settings: Settings,
    });

    return (
        <PaperProvider>
            <Tabs.Screen
                options={{
                    title: '看護',
                }}
            />
            <BottomNavigation
                navigationState={{index, routes}}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </PaperProvider>
    )
}


export default CareGiver;

