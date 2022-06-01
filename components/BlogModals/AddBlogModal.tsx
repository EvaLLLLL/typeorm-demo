import React from 'react'
import axios from 'axios'
import { Form, Modal, Input, message, Select } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import { Author } from '../../src/entity/Author'

export const AddBlogModal: React.FC<ModalProps & { authors: Author[] }> = ({
  visible,
  onCancel,
  onOk,
  authors,
}) => {
  const [addBlogModal] = Form.useForm()

  React.useEffect(() => {
    addBlogModal.resetFields()
  }, [visible, addBlogModal])

  return (
    <AddBlogModalInner
      authors={authors}
      form={addBlogModal}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await addBlogModal.validateFields()
        if (!values) return

        const { data: newData } = await axios.post('/api/blog/add', values)
        message.success('添加成功')
        onOk(newData)
      }}
    />
  )
}

const AddBlogModalInner: React.FC<ModalInnerProps & { authors: Author[] }> = ({
  visible,
  onCancel,
  form,
  onOk,
  authors,
}) => {
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
