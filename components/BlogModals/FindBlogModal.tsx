import React from 'react'
import { Form, Modal, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const FindBlogModal = observer(() => {
  const [findBlogModal] = Form.useForm()
  const { blog: blogStore, findBlog } = useStores()
  const { findModalVisible, toggleFindModalVisible } = blogStore

  React.useEffect(() => {
    findBlogModal.resetFields()
  }, [findModalVisible, findBlogModal])

  return (
    <FindBlogModalInner
      form={findBlogModal}
      visible={findModalVisible}
      onCancel={toggleFindModalVisible}
      onOk={async () => {
        const values = await findBlogModal.validateFields()
        if (!values) return

        await findBlog(values.id)
        toggleFindModalVisible()
      }}
    />
  )
})

const FindBlogModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal title="find blog" visible={visible} onCancel={onCancel} onOk={onOk}>
      <Form
        autoComplete="off"
        form={form}
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
}
