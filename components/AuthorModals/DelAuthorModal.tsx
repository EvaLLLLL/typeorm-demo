import React from 'react'
import { Form, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const DelAuthorModal = observer(() => {
  const [delAuthorForm] = Form.useForm()
  const { author: authorStore, delAuthor } = useStores()
  const { delModalVisible, toggleDelModalVisible } = authorStore

  return (
    <Modal
      title="delete author"
      visible={delModalVisible}
      onCancel={toggleDelModalVisible}
      onSubmit={async () => {
        const values = await delAuthorForm.validateFields()
        if (!values) return

        await delAuthor(values.id)
        delAuthorForm.resetFields()
        toggleDelModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={delAuthorForm}
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
