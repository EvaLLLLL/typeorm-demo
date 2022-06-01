import React from 'react'
import { Form, Modal, InputNumber, message } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import axios from 'axios'

export const DelCommentModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [delCommentForm] = Form.useForm()

  React.useEffect(() => {
    delCommentForm.resetFields()
  }, [visible, delCommentForm])

  return (
    <DelCommentModalInner
      form={delCommentForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await delCommentForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/comment/del', values)
        message.success('删除成功')
        onOk(newData)
      }}
    />
  )
}

const DelCommentModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      title="delete comment"
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
          rules={[
            {
              required: true,
              type: 'number',
              message: 'Please input id to delete',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}
