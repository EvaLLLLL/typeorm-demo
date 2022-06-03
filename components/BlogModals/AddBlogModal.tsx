import React from 'react'
import { Form, Input, Select } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const AddBlogModal = observer(() => {
  const [addBlogModal] = Form.useForm()
  const { blog: blogStore, author: authorStores, addBlog } = useStores()
  const { addModalVisible, toggleAddModalVisible } = blogStore

  return (
    <Modal
      title="add blog"
      visible={addModalVisible}
      onCancel={toggleAddModalVisible}
      onSubmit={async () => {
        const values = await addBlogModal.validateFields()
        if (!values) return

        await addBlog(values)
        addBlogModal.resetFields()
        toggleAddModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={addBlogModal}
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
            options={authorStores.data.map(({ id, name }) => ({
              label: `id: ${id}, name: ${name}`,
              value: id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
