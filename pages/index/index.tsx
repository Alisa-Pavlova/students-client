import { AxiosResponse, ResponseType } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../../config/api'
import { IStudent, IStudentCount } from '../interfaces'
import styles from './styles.module.css'
import { Spin, Pagination, Card } from 'antd'

const ITEMS_ON_PAGE = 5
const PERFORMACE_MAP = ['F', 'D', 'C', 'B', 'A']

const Home: NextPage = () => {
  const [students, setStudents] = useState<IStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsCount, setStudentsCount] = useState(0)
  

  useEffect(() => {
    (async function() {
      try {
        const { data } = await api.get<IStudentCount>(`api/v1/students?limit=${ITEMS_ON_PAGE}&offset=${(currentPage - 1)}`)
        setStudents(data.rows)
        setStudentsCount(data.count)
      } catch (err) {
       alert(`failed to get students list: ${err}`)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [currentPage])

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

        {studentsCount && <>
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

        {studentsCount &&  <>No students was found</>}


        
        </>}
      </main>
    
    </div>
  )
}

export default Home
