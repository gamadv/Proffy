import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'


import PageHeader from '../../components/PageHeader/pageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem/teacherItem'

import api from '../../services/api'

import teacherListST from './teacherListST'

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)
    const [favs, setFavs] = useState<number[]>([])

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');


    function loadFavs(){
        AsyncStorage.getItem('favs').then(res => {
            if (res) {

                const favTeachers = JSON.parse(res)
                const favTeackersIds = favTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                setFavs(favTeackersIds)

            }
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFilterSubmit() {
        loadFavs()
        const res = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })

        setIsFiltersVisible(false)
        setTeachers(res.data)
    }

    return (
        <View style={teacherListST.container}>
            <PageHeader
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color='#fff' />
                    </BorderlessButton>
                )}
                title='Proffys Disponíves:'>

                {isFiltersVisible && (

                    <KeyboardAvoidingView 
                    behavior='position'
                    style={teacherListST.searchForm}>
                        <Text style={teacherListST.label}> Matéria </Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholderTextColor='#c1bccc'
                            style={teacherListST.input}
                            placeholder="Qual a Matéria ?"
                        ></TextInput>

                        <View style={teacherListST.inputGroup}>
                            <View style={teacherListST.inputBlock}>
                                <Text style={teacherListST.label}> Qual dia?</Text>
                                <TextInput
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                    placeholderTextColor='#c1bccc'
                                    style={teacherListST.input}
                                    placeholder="Qual o dia ?"
                                ></TextInput>
                            </View>

                            <View style={teacherListST.inputBlock}>
                                <Text style={teacherListST.label}> Horário:</Text>
                                <TextInput
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholderTextColor='#c1bccc'
                                    style={teacherListST.input}
                                    placeholder="Em qual horário ?"
                                ></TextInput>
                            </View>

                        </View>
                        <RectButton
                            onPress={handleFilterSubmit}
                            style={teacherListST.searchButton}>
                            <Text style={teacherListST.searchButtonText}> Buscar </Text>
                        </RectButton>

                    </KeyboardAvoidingView>
                )}
            </PageHeader>

            <ScrollView
                style={teacherListST.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            faved={favs.includes(teacher.id)}
                            key={teacher.id}
                            teacher={teacher} />)
                })}
            </ScrollView>

        </View>
    )
}

export default TeacherList