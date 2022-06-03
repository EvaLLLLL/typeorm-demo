import React from 'react'
import { Form, Input, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const AddUserModal = observer(() => {
  const [addUserForm] = Form.useForm()
  const { user: userStore, addUser } = useStores()
  const { addModalVisible, toggleAddModalVisible } = userStore

  return (
    <Modal
      title="add user"
      visible={addModalVisible}
      onCancel={toggleAddModalVisible}
      onSubmit={async () => {
        const values = await addUserForm.validateFields()
        if (!values) return

        await addUser(values)
        addUserForm.resetFields()
        toggleAddModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={addUserForm}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="age"
          name="age"
          rules={[
            {
              required: false,
              type: 'number',
              message: 'Please input your age',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
})
