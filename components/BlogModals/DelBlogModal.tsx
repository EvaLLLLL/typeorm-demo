import React from 'react'
import { Form, Modal, InputNumber, message } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import axios from 'axios'

export const DelBlogModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [delBlogForm] = Form.useForm()

  React.useEffect(() => {
    delBlogForm.resetFields()
  }, [visible, delBlogForm])

  return (
    <DelBlogModalInner
      form={delBlogForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await delBlogForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/blog/del', values)
        message.success('删除成功')
        onOk(newData)
      }}
    />
  )
}

const DelBlogModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      title="delete blog"
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
