export interface IStudent {
    id: number
    name: string
    second_name: string
    surname: string
    performance?: number
    birth: Date
    subjects: string[]
    createdAt?: Date
    updatedAt?: Date
  }

  export interface IStudentCount {
    rows: IStudent[]
    count: number
  }