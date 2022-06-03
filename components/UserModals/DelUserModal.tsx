import React from 'react'
import { Form, Modal, InputNumber, message } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { Instance } from 'mobx-state-tree'
import { UserStore } from '../../models/UserStore'

export const DelUserModal = observer<{ store: Instance<typeof UserStore> }>(
  ({ store: userStore }) => {
    const [delUserForm] = Form.useForm()
    const { delModalVisible, toggleDelModalVisible, del } = userStore

    React.useEffect(() => {
      delUserForm.resetFields()
    }, [delModalVisible, delUserForm])

    return (
      <DelUserModalInner
        form={delUserForm}
        visible={delModalVisible}
        onCancel={toggleDelModalVisible}
        onOk={async () => {
          const values = await delUserForm.validateFields()
          if (!values) return

          del(values.id)
          toggleDelModalVisible()
        }}
      />
    )
  },
)

const DelUserModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      title="delete user"
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
