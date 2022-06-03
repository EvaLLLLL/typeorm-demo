import React from 'react'
import { Form, Modal, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const DelCommentModal = observer(() => {
  const [delCommentForm] = Form.useForm()
  const { comment: commentStore, delComment } = useStores()
  const { delModalVisible, toggleDelModalVisible } = commentStore

  React.useEffect(() => {
    delCommentForm.resetFields()
  }, [delModalVisible, delCommentForm])

  return (
    <DelCommentModalInner
      form={delCommentForm}
      visible={delModalVisible}
      onCancel={toggleDelModalVisible}
      onOk={async () => {
        const values = await delCommentForm.validateFields()
        if (!values) return

        await delComment(values.id)
        toggleDelModalVisible()
      }}
    />
  )
})

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
