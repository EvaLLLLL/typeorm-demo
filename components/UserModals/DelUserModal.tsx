import React from 'react'
import { Form, Modal, FormInstance, InputNumber } from 'antd'

export const DelUserModal: React.FC<{
  visible: boolean
  onCancel: () => void
  form: FormInstance
  onOk: () => void | Promise<void>
}> = ({ visible, onCancel, form, onOk }) => {
  return (
    <Modal
      title="delete user"
      visible={visible}
      onCancel={onCancel}
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
          rules={[{ required: true, message: 'Please input id to delete' }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}
