import React, { useState, useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from 'react-native-gesture-handler'

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import landingST from './landingST'

// style={landingST.container}

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0)

    useFocusEffect(() => {
        api.get('connections').then(res => {
            const { total } = res.data

            setTotalConnections(total)
        })
    },)

    const { navigate } = useNavigation()

    function handleNavigateToGiveClassesPage() {
        navigate('GiveClasses')
    }

    function handleNavigateToStudy() {
        navigate('Study')
    }

    return (
        <View style={landingST.container}>
            <Image source={landingImg} style={landingST.banner} />

            <Text style={landingST.title}>
                {' '}Seja bem-vindo, {'\n'}
                <Text style={landingST.titleBold}> Do que precisa? </Text>
            </Text>

            <View style={landingST.buttonsContainer}>
                <RectButton
                    onPress={handleNavigateToStudy}
                    style={[landingST.button, landingST.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={landingST.buttonText}> Estudar </Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigateToGiveClassesPage}
                    style={[landingST.button, landingST.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    <Text style={landingST.buttonText}> Lecionar </Text>
                </RectButton>
            </View>

            <Text style={landingST.totalConnections}> Total de {totalConnections} conexões Realizadas  {' '}
                <Image source={heartIcon} />
            </Text>

        </View>
    )
}

export default Landing