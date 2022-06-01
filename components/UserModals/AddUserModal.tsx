import React from 'react'
import { Form, Modal, Input, InputNumber, message } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import axios from 'axios'

export const AddUserModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [addUserForm] = Form.useForm()

  return (
    <AddUserModalInner
      form={addUserForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await addUserForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/user/add', values)
        message.success('添加成功')
        onOk(newData)
      }}
    />
  )
}

const AddUserModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      title="add user"
      onOk={onOk}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="age"
          name="age"
          rules={[
            {
              required: false,
              type: 'number',
              message: 'Please input your age',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}
