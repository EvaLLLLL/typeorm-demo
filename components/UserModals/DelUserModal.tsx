import React from 'react'
import { Form, Modal, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const DelUserModal = observer(() => {
  const [delUserForm] = Form.useForm()
  const { user: userStore, delUser } = useStores()
  const { delModalVisible, toggleDelModalVisible } = userStore

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

        await delUser(values.id)
        toggleDelModalVisible()
      }}
    />
  )
})

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
