import React from 'react'
import { Form, Input, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const UpdateAuthorModal = observer(() => {
  const [updateAuthorForm] = Form.useForm()
  const { author: authorStore, updateAuthor } = useStores()
  const { updateModalVisible, toggleUpdateModalVisible } = authorStore

  return (
    <Modal
      visible={updateModalVisible}
      onCancel={toggleUpdateModalVisible}
      title="update author name"
      onSubmit={async () => {
        const values = await updateAuthorForm.validateFields()
        if (!values) return

        await updateAuthor(values)
        updateAuthorForm.resetFields()
        toggleUpdateModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={updateAuthorForm}
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
})
