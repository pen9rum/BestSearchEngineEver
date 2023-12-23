import React from 'react'
import { router, Link} from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper';


const Choose = () => {

    return (
        <View>
            <Button mode="contained-tonal" onPress={() => router.push('/CareRecipient/Recipient')}> Recipient </Button>
            <Button mode="contained-tonal" onPress={() => router.push('/CareGiver/CareGiver')}> Care-Giver </Button>
        </View>
    )
}

export default Choose