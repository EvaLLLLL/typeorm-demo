import React from 'react'
import { Form, Input, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'

export const UpdateUserModal = observer(() => {
  const [updateUserForm] = Form.useForm()
  const { user: userStore } = useStore()
  const { updateModalVisible, toggleUpdateModalVisible, updateUser } = userStore

  return (
    <Modal
      title="update user name"
      visible={updateModalVisible}
      onCancel={toggleUpdateModalVisible}
      onSubmit={async () => {
        const values = await updateUserForm.validateFields()
        if (!values) return

        await updateUser(values)
        updateUserForm.resetFields()
        toggleUpdateModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={updateUserForm}
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
              message: 'Please input user id',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input a new user name' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
})
