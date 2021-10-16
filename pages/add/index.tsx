import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { api } from '../../config/api'
import { IForm, IStudent } from '../interfaces'
import styles from './styles.module.css'
import { Spin, Card, Form } from 'antd'
import FormComponent from '../../components/form'
import { PERFORMACE_MAP } from '../../config/contants'

const addStudentPage: NextPage = () => {
  const [student, setStudent] = useState<IStudent>()
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (form: IForm) => {
      try {
        if (!(form.name && form.second_name && form.surname && form.birth && form.subjects?.length)) {
          console.log(form);
          
          throw new Error('Fill required fields')
        }
        setIsLoading(true)
        const { data } = await api.post<IStudent>('api/v1/students', form)
        setStudent(data)
      } catch (err) {
       alert(`failed to create student: ${err}`)
      } finally {
        setIsLoading(false)
      }
  }

  const onClear = () => form.resetFields()

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Student</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       {isLoading && <div className={styles.wrapper}><Spin size={'large'} /></div>}
       {!isLoading && <>
        <h1 className={styles.title}>
        Add Student
        </h1>
        <a href="/">Students List</a>
        <FormComponent buttonText={'Add'} onFinish={onFinish} onClear={onClear} search={false} />

        {!!student && <>
          <Card className={styles.card} key={student.id} title={`${student.surname} ${student.name} ${student.second_name}`}>
            <p>Subjects: {student.subjects.map(sub => <span key={student.id + sub}>{sub}{' '}</span>)}</p>
            <p>Date of Birth: {student.birth}</p>
            {student.performance && <p>Performanse: {PERFORMACE_MAP[student.performance]}</p>}
          </Card>
        </>}

        </>}
      </main>
    
    </div>
  )
}

export default addStudentPage
