import React from 'react'
import { Form, Modal, Input, message, Select } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import axios from 'axios'
import { User } from '../../src/entity/User'
import { Blog } from '../../src/entity/Blog'

export const AddCommentModal: React.FC<
  ModalProps & { users: User[]; blogs: Blog[] }
> = ({ visible, onCancel, onOk, users, blogs }) => {
  const [addCommentForm] = Form.useForm()

  React.useEffect(() => {
    addCommentForm.resetFields()
  }, [visible, addCommentForm])

  return (
    <AddCommentModalInner
      users={users}
      blogs={blogs}
      form={addCommentForm}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await addCommentForm.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/comment/add', values)
        message.success('添加成功')
        onOk(newData)
      }}
    />
  )
}

const AddCommentModalInner: React.FC<
  ModalInnerProps & { users: User[]; blogs: Blog[] }
> = ({ visible, onCancel, form, onOk, users, blogs }) => {
  return (
    <Modal
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      title="add comment"
      onOk={onOk}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="content"
          name="content"
          rules={[{ required: true, message: 'Please input your content' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="blog"
          name="blogId"
          rules={[
            {
              required: true,
              type: 'number',
              message: 'Please select a blog',
            },
          ]}
        >
          <Select
            options={blogs.map(({ id, title }) => ({
              label: `id: ${id}, title: ${title}`,
              value: id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="user"
          name="userId"
          rules={[
            {
              required: true,
              type: 'number',
              message: 'Please select a user',
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
