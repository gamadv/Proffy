import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import giveClassesBgImage from '../../assets/images/give-classes-background.png'

import giveClassesST from './giveClassesST'
import { useNavigation } from '@react-navigation/native'


function GiveClasses() {
    const { goBack } = useNavigation()

    function handleNavigateBack() {
        goBack()
    }

    return (
        <View style={giveClassesST.container}>
            <ImageBackground
                resizeMode='contain'
                source={giveClassesBgImage}
                style={giveClassesST.content}>
                <Text style={giveClassesST.title}> Deseja ser um Proffy? </Text>
                <Text style={giveClassesST.desc}> Para isso é necessário que você
            vá para o nossa plataforma WEB ;) </Text>
            </ImageBackground>

            <RectButton
                onPress={handleNavigateBack}
                style={giveClassesST.okButton}>
                <Text style={giveClassesST.okButtonText}> Ok! Indo lá. </Text>
            </RectButton>

        </View>
    )
}


export default GiveClasses