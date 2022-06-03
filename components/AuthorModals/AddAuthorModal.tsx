import React from 'react'
import { Form, Modal, Input, Select } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'
import { getSnapshot, SnapshotOrInstance } from 'mobx-state-tree'
import { User } from '../../models/UserStore'

export const AddAuthorModal = observer(() => {
  const [addAuthorForm] = Form.useForm()
  const { author: authorStore, user: userStore, addAuthor } = useStores()
  const { addModalVisible, toggleAddModalVisible } = authorStore

  React.useEffect(() => {
    addAuthorForm.resetFields()
  }, [addModalVisible, addAuthorForm])

  return (
    <AddUserModalInner
      users={getSnapshot(userStore.data)}
      form={addAuthorForm}
      visible={addModalVisible}
      onCancel={toggleAddModalVisible}
      onOk={async () => {
        const values = await addAuthorForm.validateFields()
        if (!values) return

        addAuthor(values)
        toggleAddModalVisible()
      }}
    />
  )
})

const AddUserModalInner: React.FC<
  ModalInnerProps & { users: SnapshotOrInstance<typeof User>[] }
> = ({ visible, onCancel, form, onOk, users }) => {
  return (
    <Modal
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      title="add author"
      onOk={onOk}
    >
      <Form
        autoComplete="off"
        form={form}
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
            options={users
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
}
