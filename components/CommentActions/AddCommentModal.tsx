import React from 'react'
import { Form, Input, Select } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'

export const AddCommentModal = observer(() => {
  const [addCommentForm] = Form.useForm()
  const {
    comment: commentStore,
    user: userStore,
    blog: blogStore,
  } = useStore()
  const { addModalVisible, toggleAddModalVisible, addComment } = commentStore

  return (
    <Modal
      title="add comment"
      visible={addModalVisible}
      onCancel={toggleAddModalVisible}
      onSubmit={async () => {
        const values = await addCommentForm.validateFields()
        if (!values) return

        await addComment(values)
        addCommentForm.resetFields()
        toggleAddModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={addCommentForm}
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
            options={blogStore.data.map(({ id, title }) => ({
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
            options={userStore.data.map(({ id, name }) => ({
              label: `id: ${id}, name: ${name}`,
              value: id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
