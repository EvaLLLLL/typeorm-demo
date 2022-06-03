import React from 'react'
import { Form, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const DelUserModal = observer(() => {
  const [delUserForm] = Form.useForm()
  const { user: userStore, delUser } = useStores()
  const { delModalVisible, toggleDelModalVisible } = userStore

  return (
    <Modal
      title="delete user"
      visible={delModalVisible}
      onCancel={toggleDelModalVisible}
      onSubmit={async () => {
        const values = await delUserForm.validateFields()
        if (!values) return

        await delUser(values.id)
        delUserForm.resetFields()
        toggleDelModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={delUserForm}
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
