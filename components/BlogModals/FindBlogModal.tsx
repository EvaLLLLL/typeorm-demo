import React from 'react'
import { Form, Modal, message, InputNumber } from 'antd'
import { ModalInnerProps, ModalProps } from '../../types'
import axios from 'axios'

export const FindBlogModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [findBlogModal] = Form.useForm()

  React.useEffect(() => {
    findBlogModal.resetFields()
  }, [visible, findBlogModal])

  return (
    <FindBlogModalInner
      form={findBlogModal}
      visible={visible}
      onCancel={onCancel}
      onOk={async () => {
        const values = await findBlogModal.validateFields()
        if (!values) return

        const { data: newData } = await axios.get('/api/blog/find', {
          params: values,
        })

        message.success('查询成功')
        onOk(newData)
      }}
    />
  )
}

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
