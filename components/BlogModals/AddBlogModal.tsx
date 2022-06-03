import React from 'react'
import { Form, Modal, Input, Select } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'
import { getSnapshot, SnapshotOrInstance } from 'mobx-state-tree'
import { Author } from '../../models/AuthorStore'

export const AddBlogModal = observer(() => {
  const [addBlogModal] = Form.useForm()
  const { blog: blogStore, author: authorStores, addBlog } = useStores()
  const { addModalVisible, toggleAddModalVisible } = blogStore

  React.useEffect(() => {
    addBlogModal.resetFields()
  }, [addModalVisible, addBlogModal])

  return (
    <AddBlogModalInner
      authors={getSnapshot(authorStores.data)}
      form={addBlogModal}
      visible={addModalVisible}
      onCancel={toggleAddModalVisible}
      onOk={async () => {
        const values = await addBlogModal.validateFields()
        if (!values) return

        await addBlog(values)
        toggleAddModalVisible()
      }}
    />
  )
})

const AddBlogModalInner: React.FC<
  ModalInnerProps & { authors: SnapshotOrInstance<typeof Author>[] }
> = ({ visible, onCancel, form, onOk, authors }) => {
  return (
    <Modal
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      title="add blog"
      onOk={onOk}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true, message: 'Please input title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="content"
          name="content"
          rules={[{ required: true, message: 'Please input content' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="authors"
          name="authorIds"
          rules={[
            {
              required: true,
              message: 'Please select authors',
            },
          ]}
        >
          <Select
            mode="multiple"
            options={authors.map(({ id, name }) => ({
              label: `id: ${id}, name: ${name}`,
              value: id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
