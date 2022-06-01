import React from 'react'
import { Form, Modal, Input, FormInstance, InputNumber } from 'antd'

export const AddUserModal: React.FC<{
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
