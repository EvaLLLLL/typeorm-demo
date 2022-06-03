import React from 'react'
import { Form, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store'

export const DelBlogModal = observer(() => {
  const [delBlogForm] = Form.useForm()
  const { blog: blogStore } = useStores()
  const { delModalVisible, toggleDelModalVisible, delBlog } = blogStore

  return (
    <Modal
      title="delete blog"
      visible={delModalVisible}
      onCancel={toggleDelModalVisible}
      onSubmit={async () => {
        const values = await delBlogForm.validateFields()
        if (!values) return

        await delBlog(values.id)
        delBlogForm.resetFields()
        toggleDelModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={delBlogForm}
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
})
