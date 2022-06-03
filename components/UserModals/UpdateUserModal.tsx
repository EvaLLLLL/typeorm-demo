import React from 'react'
import { Form, Modal, Input, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { Instance } from 'mobx-state-tree'
import { UserStore } from '../../models/UserStore'

export const UpdateUserModal = observer<{ store: Instance<typeof UserStore> }>(
  ({ store: userStore }) => {
    const [updateUserForm] = Form.useForm()
    const { updateModalVisible, toggleUpdateModalVisible, update } = userStore

    React.useEffect(() => {
      updateUserForm.resetFields()
    }, [updateModalVisible, updateUserForm])

    return (
      <UpdateUserModalInner
        form={updateUserForm}
        visible={updateModalVisible}
        onCancel={toggleUpdateModalVisible}
        onOk={async () => {
          const values = await updateUserForm.validateFields()
          if (!values) return

          await update(values)
          toggleUpdateModalVisible()
        }}
      />
    )
  },
)

export const UpdateUserModalInner: React.FC<ModalInnerProps> = ({
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
      title="update user name"
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
}
