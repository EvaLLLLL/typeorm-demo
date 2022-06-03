import React from 'react'
import { Form, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store'

export const DelCommentModal = observer(() => {
  const [delCommentForm] = Form.useForm()
  const { comment: commentStore } = useStores()
  const { delModalVisible, toggleDelModalVisible, delComment } = commentStore

  return (
    <Modal
      title="delete comment"
      visible={delModalVisible}
      onCancel={toggleDelModalVisible}
      onSubmit={async () => {
        const values = await delCommentForm.validateFields()
        if (!values) return

        await delComment(values.id)
        delCommentForm.resetFields()
        toggleDelModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={delCommentForm}
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
})
