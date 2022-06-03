import React from 'react'
import { Form, Modal, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const DelBlogModal = observer(() => {
  const [delBlogForm] = Form.useForm()
  const { blog: blogStore, delBlog } = useStores()
  const { delModalVisible, toggleDelModalVisible } = blogStore

  return (
    <DelBlogModalInner
      form={delBlogForm}
      visible={delModalVisible}
      onCancel={toggleDelModalVisible}
      onOk={async () => {
        const values = await delBlogForm.validateFields()
        if (!values) return

        await delBlog(values.id)
        toggleDelModalVisible()
      }}
    />
  )
})

const DelBlogModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      title="delete blog"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        autoComplete="off"
        form={form}
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
}
