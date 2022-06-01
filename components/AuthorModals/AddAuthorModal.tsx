import React from 'react'
import axios from 'axios'
import { Form, Modal, Input, message, Select } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import { User } from '../../src/entity/User'

export const AddAuthorModal: React.FC<ModalProps & { users: User[] }> = ({
  visible,
  onCancel,
  onOk,
  users,
}) => {
  const [addAuthorForm] = Form.useForm()

  React.useEffect(() => {
    addAuthorForm.resetFields()
  }, [visible, addAuthorForm])

  return (
    <AddUserModalInner
      users={users}
      form={addAuthorForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await addAuthorForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/author/add', values)
        message.success('添加成功')
        onOk(newData)
      }}
    />
  )
}

const AddUserModalInner: React.FC<ModalInnerProps & { users: User[] }> = ({
  visible,
  onCancel,
  form,
  onOk,
  users,
}) => {
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
            options={users.map(({ id, name }) => ({
              label: `id: ${id}, name: ${name}`,
              value: id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
