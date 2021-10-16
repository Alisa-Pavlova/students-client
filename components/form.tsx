import React, { FunctionComponent } from 'react'
import { Input, Button, Space, Select, Form } from 'antd'
import { PERFORMACE_MAP, SUBJECTS } from '../config/contants'
import { IForm, IStudent } from '../interfaces'

type Props = {
    onFinish: (form: IForm) => void
    onClear: () => void
    search: boolean
    student?: IStudent
    buttonText: string
  }

const FormComponent: FunctionComponent<Props> = ({ onFinish, onClear, search, buttonText, student }) => {
  const [form] = Form.useForm()

  return (
        <Form
          style={{ textAlign: 'center' }}
          form={form}
          name="register"
          onFinish={onFinish}
        >
          <Space>
            <Form.Item name='name' initialValue={student?.name}>
              <Input placeholder={'name'} />
            </Form.Item>
            <Form.Item name='surname' initialValue={student?.surname}>
              <Input placeholder={'surname'} />
            </Form.Item>
            <Form.Item name='second_name' initialValue={student?.second_name}>
              <Input placeholder={'second_name'} />
            </Form.Item>            
          </Space>

          <Space>
            <Form.Item name='birth' initialValue={student?.birth}>
              <Input type='date' placeholder={'birth'} />
            </Form.Item>
            <Form.Item name='subjects' initialValue={student?.subjects}>
            <Select
              style={{ width: '150px' }}
              placeholder="Select a subject"
              optionFilterProp="children"
              mode={search ? undefined : "multiple"}
            >
              {SUBJECTS.map(subject => <Select.Option value={subject} key={subject}>{subject}</Select.Option>)}
            </Select>
            </Form.Item>
            <Form.Item name='performance' initialValue={student?.performance}>
              <Select
                  placeholder="Select a grade"
                  optionFilterProp="children"
                >
                {PERFORMACE_MAP.map((grade, index) => <Select.Option value={index} key={grade}>{grade}</Select.Option>)}
              </Select>
            </Form.Item>
          </Space>
          <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit">{buttonText}</Button>
          {!student && <Button style={{marginLeft: '10px'}} type="primary" onClick={onClear}>Clear</Button>}
        </Form>
  )
}

export default FormComponent
