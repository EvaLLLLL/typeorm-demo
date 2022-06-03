import React from 'react'
import { Form, Modal, Input, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const UpdateAuthorModal = observer(() => {
  const [updateAuthorForm] = Form.useForm()
  const { author: authorStore, updateAuthor } = useStores()
  const { updateModalVisible, toggleUpdateModalVisible } = authorStore

  React.useEffect(() => {
    updateAuthorForm.resetFields()
  }, [updateModalVisible, updateAuthorForm])

  return (
    <UpdateAuthorModalInner
      form={updateAuthorForm}
      visible={updateModalVisible}
      onCancel={toggleUpdateModalVisible}
      onOk={async () => {
        const values = await updateAuthorForm.validateFields()
        if (!values) return

        await updateAuthor(values)
        toggleUpdateModalVisible()
      }}
    />
  )
})

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
