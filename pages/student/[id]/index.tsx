import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { api } from '../../../config/api'
import { IForm, IStudent, IStudentCount } from '../../../interfaces'
import styles from './styles.module.css'
import { Spin, Card, Form } from 'antd'
import FormComponent from '../../../components/form'
import { PERFORMACE_MAP } from '../../../config/contants'

const UpdateStudentPage: NextPage = (props) => {
  const propsData = (props as unknown) as { data: IStudent }
  const [student, setStudent] = useState<IStudent>(propsData.data)
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()


  const onFinish = async (form: IForm) => {
    try {
      if (!(form.name && form.second_name && form.surname && form.birth && form.subjects?.length)) {
        throw new Error('Fill required fields')
      }
      setIsLoading(true)
      const { data } = await api.put<IStudent>(`api/v1/students/${student.id}`, form)
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
        <title>Update Student</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isLoading && <div className={styles.wrapper}><Spin size={'large'} /></div>}
        {!isLoading && <>
          <h1 className={styles.title}>
            Update student
          </h1>
          <a href="/">Students List</a>
          <FormComponent buttonText={'Update'} student={student} onFinish={onFinish} onClear={onClear} search={false} />

          {!!student && <>
            <Card className={styles.card} key={student.id} title={`${student.surname} ${student.name} ${student.second_name}`}>
              <p>Subjects: {student.subjects.map((sub: string) => <span key={student.id + sub}>{sub}{' '}</span>)}</p>
              <p>Date of Birth: {student.birth}</p>
              {student.performance && <p>Performanse: {PERFORMACE_MAP[student.performance]}</p>}
            </Card>
          </>}

        </>}
      </main>

    </div>
  )
}

export default UpdateStudentPage

export async function getServerSideProps(ctx: NextPageContext): Promise<{ props: { data: IStudent }} | { notFound: boolean }> {
  try {
    const id = Number(ctx.query.id)
    const { data } = await api.get<IStudent>(`api/v1/students/${id}`)

    if (!data) {
      return { notFound: true }
    }

    return { props: { data } }
  } catch (ignore) {
    return { notFound: true }
  }
}
