import React from 'react'
import { Form, Modal, Input, FormInstance, InputNumber } from 'antd'

export const UpdateUserModal: React.FC<{
  visible: boolean
  onCancel: () => void
  form: FormInstance
  onOk: () => void | Promise<void>
}> = ({ visible, onCancel, form, onOk }) => {
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
