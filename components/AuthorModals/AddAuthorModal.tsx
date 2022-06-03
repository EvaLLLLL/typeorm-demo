import React from 'react'
import { Form, Input, Select } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const AddAuthorModal = observer(() => {
  const [addAuthorForm] = Form.useForm()
  const { author: authorStore, user: userStore } = useStores()
  const { addModalVisible, toggleAddModalVisible, addAuthor } = authorStore

  return (
    <Modal
      visible={addModalVisible}
      onCancel={toggleAddModalVisible}
      title="add author"
      onSubmit={async () => {
        const values = await addAuthorForm.validateFields()
        if (!values) return

        await addAuthor(values)
        addAuthorForm.resetFields()
        toggleAddModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={addAuthorForm}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="user"
          name="userId"
          rules={[
            {
              required: true,
              message: 'Please select user',
            },
          ]}
        >
          <Select
            options={userStore.data
              .filter(({ author }) => !author)
              .map(({ id, name }) => ({
                label: `id: ${id}, name: ${name}`,
                value: id,
              }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
