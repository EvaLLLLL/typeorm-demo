import React from 'react'
import { Form, Modal, InputNumber, message } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import axios from 'axios'

export const DelAuthorModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [delAuthorForm] = Form.useForm()

  React.useEffect(() => {
    delAuthorForm.resetFields()
  }, [visible, delAuthorForm])

  return (
    <DelAuthorModalInner
      form={delAuthorForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await delAuthorForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/author/del', values)
        message.success('删除成功')
        onOk(newData)
      }}
    />
  )
}

const DelAuthorModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      title="delete author"
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
