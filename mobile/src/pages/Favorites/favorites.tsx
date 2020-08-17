import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader/pageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem/teacherItem'

import favoritesST from './favoritesST'
import TeacherList from '../TeacherList/teacherList'
import { useFocusEffect } from '@react-navigation/native'

function Favorites() {

    const [favs, setFavs] = useState([])

    function loadFavs(){
        AsyncStorage.getItem('favs').then(res => {
            if (res) {
                const favTeachers = JSON.parse(res)

                setFavs(favTeachers)

            }
        })
    }

    useFocusEffect(() => {
        loadFavs()
    })


    return (
        <View style={favoritesST.container}>
            <PageHeader title='Meus Proffys Favoritos!' />

            <ScrollView
                style={favoritesST.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favs.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            faved
                            key={teacher.id}
                            teacher={teacher} />)
                })}
            </ScrollView>


        </View>
    )
}

export default Favorites