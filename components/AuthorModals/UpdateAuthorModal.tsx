import React from 'react'
import { Form, Modal, Input, InputNumber, message } from 'antd'
import axios from 'axios'
import { ModalProps, ModalInnerProps } from '../../types'

export const UpdateAuthorModal: React.FC<ModalProps> = ({
  onOk,
  visible,
  onCancel,
}) => {
  const [updateAuthorForm] = Form.useForm()

  React.useEffect(() => {
    updateAuthorForm.resetFields()
  }, [visible, updateAuthorForm])

  return (
    <UpdateAuthorModalInner
      form={updateAuthorForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await updateAuthorForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/author/update', values)
        onOk(newData)
        message.success('更新成功')
      }}
    />
  )
}

export const UpdateAuthorModalInner: React.FC<ModalInnerProps> = ({
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
      title="update author name"
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
              message: 'Please input author id',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="name"
          name="name"
          rules={[
            {
              required: true,
              type: 'number',
              message: 'Please input a new author name',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
