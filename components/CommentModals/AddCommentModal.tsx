import React from 'react'
import { Form, Modal, Input, Select } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'
import { getSnapshot, SnapshotOrInstance } from 'mobx-state-tree'
import { User } from '../../models/UserStore'
import { Blog } from '../../models/BlogStore'

export const AddCommentModal = observer(() => {
  const [addCommentForm] = Form.useForm()
  const {
    comment: commentStore,
    user: userStore,
    blog: blogStore,
    addComment,
  } = useStores()
  const { addModalVisible, toggleAddModalVisible } = commentStore

  React.useEffect(() => {
    addCommentForm.resetFields()
  }, [addModalVisible, addCommentForm])

  return (
    <AddCommentModalInner
      users={getSnapshot(userStore.data)}
      blogs={getSnapshot(blogStore.data)}
      form={addCommentForm}
      visible={addModalVisible}
      onCancel={toggleAddModalVisible}
      onOk={async () => {
        const values = await addCommentForm.validateFields()
        if (!values) return

        await addComment(values)
        toggleAddModalVisible()
      }}
    />
  )
})

const AddCommentModalInner: React.FC<
  ModalInnerProps & {
    users: SnapshotOrInstance<typeof User>[]
    blogs: SnapshotOrInstance<typeof Blog>[]
  }
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
