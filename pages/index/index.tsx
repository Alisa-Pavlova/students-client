import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../../config/api'
import { IForm, IStudent, IStudentCount } from '../interfaces'
import styles from './styles.module.css'
import { Spin, Pagination, Card, Input, Button, Space, Select, Form } from 'antd'

const ITEMS_ON_PAGE = 5
const PERFORMACE_MAP = ['F', 'D', 'C', 'B', 'A']
const SUBJECTS = [
  'Math',
  'English',
  'Chemistry',
  'Biology',
  'Physics',
  'Economics',
  'Drawing',
  'Psychology',
  'Physical Education',
  'Geography'
]

const Home: NextPage = () => {
  const [students, setStudents] = useState<IStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsCount, setStudentsCount] = useState(0)
  const [filters, setFilters] = useState<IForm>()
  const [form] = Form.useForm()
  

  useEffect(() => {
    (async function() {
      try {
        setIsLoading(true)
        const { data } = await api.get<IStudentCount>(`api/v1/students?limit=${ITEMS_ON_PAGE}&offset=${(currentPage - 1)}`, {
          params: filters
        })
        setStudents(data.rows)
        setStudentsCount(data.count)
      } catch (err) {
       alert(`failed to get students list: ${err}`)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [currentPage, filters])

  const onFinish = (form: IForm) => {
    setFilters(form)
    setCurrentPage(1)
  }

  const onClear = () => {
    setFilters({})
    form.resetFields()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Students</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       {isLoading && <div className={styles.wrapper}><Spin size={'large'} /></div>}
       {!isLoading && <>
        <h1 className={styles.title}>
          List of students
        </h1>
        <a href="/add">Add new sudent</a>
        <Form
          style={{ textAlign: 'center' }}
          form={form}
          name="register"
          onFinish={onFinish}
        >
          <Space>
            <Form.Item name='name'>
              <Input placeholder={'name'} />
            </Form.Item>
            <Form.Item name='surname'>
              <Input placeholder={'surname'} />
            </Form.Item>
            <Form.Item name='second_name'>
              <Input placeholder={'second_name'} />
            </Form.Item>            
          </Space>

          <Space>
            <Form.Item name='birth'>
              <Input placeholder={'birth'} />
            </Form.Item>
            <Form.Item name='subject'>
            <Select
              placeholder="Select a subject"
              optionFilterProp="children"
            >
              {SUBJECTS.map(subject => <Select.Option value={subject} key={subject}>{subject}</Select.Option>)}
            </Select>
            </Form.Item>
            <Form.Item name='performance'>
              <Select
                  placeholder="Select a grade"
                  optionFilterProp="children"
                >
                {PERFORMACE_MAP.map((grade, index) => <Select.Option value={index} key={grade}>{grade}</Select.Option>)}
              </Select>
            </Form.Item>
          </Space>
          <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit">Search</Button>
          <Button style={{marginLeft: '10px'}} type="primary" onClick={onClear}>Clear</Button>
        </Form>

        

        

        {!!studentsCount && <>
          {students.map(student => <Card className={styles.card} key={student.id} title={`${student.surname} ${student.name} ${student.second_name}`}>
            <p>Subjects: {student.subjects.map(sub => <span key={student.id + sub}>{sub}{' '}</span>)}</p>
            <p>Date of Birth: {student.birth}</p>
            {student.performance && <p>Performanse: {PERFORMACE_MAP[student.performance]}</p>}
          </Card>)
          }
        
          <Pagination
            onChange={page => setCurrentPage(page)}
            defaultPageSize={ITEMS_ON_PAGE}
            defaultCurrent={1}
            total={studentsCount}
          />
        </>}

        {!studentsCount &&  <>No students was found</>}


        
        </>}
      </main>
    
    </div>
  )
}

export default Home
