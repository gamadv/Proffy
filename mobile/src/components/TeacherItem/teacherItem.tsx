import React, { useState } from 'react'
import { View, Image, Text, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import teacherItemST from './teacherItemST'

export interface Teacher {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher;
    faved: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, faved }) => {

    const [isFaved, setIsFaved] = useState(faved)


    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFav() {
        const favs = await AsyncStorage.getItem('favs')

        let favArray = []

        if (favs) {
            favArray = JSON.parse(favs)
        }

        if (isFaved) {
            const favsIndex = favArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })
            favArray.splice(favsIndex, 1)
            setIsFaved(false)
        }
        else {
            favArray.push(teacher)
            setIsFaved(true)
            
        }
        
        await AsyncStorage.setItem('favs', JSON.stringify(favArray))
    }

    return (
        <View style={teacherItemST.container}>
            <View style={teacherItemST.profile}>
                <Image
                    source={{ uri: teacher.avatar }}
                    style={teacherItemST.avatar} />

                <View style={teacherItemST.profileInfo}>
                    <Text style={teacherItemST.name}> {teacher.name}  </Text>
                    <Text style={teacherItemST.subject}> {teacher.subject}  </Text>
                </View>
            </View>

            <Text style={teacherItemST.bio}> {teacher.bio} </Text>

            <View style={teacherItemST.footer}>
                <Text style={teacherItemST.price}> Preço Hora
                    <Text style={teacherItemST.priceValue}> R$ {teacher.cost} </Text>
                </Text>
                <View style={teacherItemST.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFav}
                        style={[
                            teacherItemST.favBtn,
                            isFaved ? teacherItemST.favedBtn : {}]}>
                        {isFaved
                            ? <Image source={unfavIcon} />
                            : <Image source={heartOutlineIcon} />
                        }

                    </RectButton>

                    <RectButton
                        onPress={handleLinkToWhatsapp}
                        style={teacherItemST.contactBtn}>
                        <Image source={whatsappIcon} />
                        <Text style={teacherItemST.contactBtnText}>Entrar em Contato.</Text>
                    </RectButton>


                </View>
            </View>
        </View>
    )

}

export default TeacherItem