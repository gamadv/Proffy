import React, { useState, FormEvent } from 'react'

import api from '../../services/api'

import Header from '../../components/PageHeader/header'
import TeacherItem, {Teacher} from '../../components/TeacherItem/teacherItem'
import Input from '../../components/Input/input'
import Select from '../../components/Select/select'

import './teacherListST.css'

function TeacherList() {

    const [teachers, setTeachers] = useState([]);


    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()

        const res = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })
        setTeachers(res.data)

    }


    return (
        <div id="page-teacher-list" className="container">
            <Header title="Estes sãos os Proffys disponiveis:">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name={subject}
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        label="Matéria"
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Quimica', label: 'Quimica' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'História', label: 'História' },
                        ]}
                    />
                    <Select
                        name={week_day}
                        value={week_day}
                        onChange={(e) => { setWeek_day(e.target.value) }}
                        label="Dia da semana"
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                        name="time" label="Horario" type="time" />

                    <button type="submit" onClick={searchTeachers}> Buscar </button>
                </form>
            </Header>

            <main>
                {teachers.map((teacher: Teacher )=>{
                    return <TeacherItem key={teacher.id } teacher={teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList