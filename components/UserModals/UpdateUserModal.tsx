import React from 'react'
import { Form, Modal, Input, InputNumber, message } from 'antd'
import axios from 'axios'
import { ModalProps, ModalInnerProps } from '../../types'

export const UpdateUserModal: React.FC<ModalProps> = ({
  onOk,
  visible,
  onCancel,
}) => {
  const [updateUserForm] = Form.useForm()

  return (
    <UpdateUserModalInner
      form={updateUserForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await updateUserForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/user/update', values)
        onOk(newData)
        message.success('更新成功')
      }}
    />
  )
}

export const UpdateUserModalInner: React.FC<ModalInnerProps> = ({
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
      title="update user name"
      onOk={onOk}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="id"
          name="id"
          rules={[
            {
              type: 'number',
              required: true,
              message: 'Please input user id',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input a new user name' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
