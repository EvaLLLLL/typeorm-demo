import React from 'react'
import { Form, Modal, InputNumber, message } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import axios from 'axios'

export const DelUserModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [delUserForm] = Form.useForm()

  React.useEffect(() => {
    delUserForm.resetFields()
  }, [visible, delUserForm])

  return (
    <DelUserModalInner
      form={delUserForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await delUserForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/user/del', values)
        message.success('删除成功')
        onOk(newData)
      }}
    />
  )
}

const DelUserModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
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
