import React from 'react'
import { Form, InputNumber } from 'antd'
import { Modal } from '../Modal'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'

export const FindBlogModal = observer(() => {
  const [findBlogModal] = Form.useForm()
  const { blog: blogStore } = useStore()
  const { findModalVisible, toggleFindModalVisible, findBlog } = blogStore

  return (
    <Modal
      title="find blog"
      visible={findModalVisible}
      onCancel={toggleFindModalVisible}
      onSubmit={async () => {
        const values = await findBlogModal.validateFields()
        if (!values) return

        await findBlog(values.id)
        findBlogModal.resetFields()
        toggleFindModalVisible()
      }}
    >
      <Form
        autoComplete="off"
        form={findBlogModal}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="find blog by id"
          name="id"
          rules={[
            {
              required: true,
              type: 'number',
              message: 'Please input a number',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
})
