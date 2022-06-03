import React from 'react'
import { Form, Modal, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models'

export const DelAuthorModal = observer(() => {
  const [delAuthorForm] = Form.useForm()
  const { author: authorStore, delAuthor } = useStores()
  const { delModalVisible, toggleDelModalVisible } = authorStore
  React.useEffect(() => {
    delAuthorForm.resetFields()
  }, [delModalVisible, delAuthorForm])

  return (
    <DelAuthorModalInner
      form={delAuthorForm}
      visible={delModalVisible}
      onCancel={toggleDelModalVisible}
      onOk={async () => {
        const values = await delAuthorForm.validateFields()
        if (!values) return

        await delAuthor(values.id)
        toggleDelModalVisible()
      }}
    />
  )
})

const DelAuthorModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      title="delete author"
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
              type: 'number',
              required: true,
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
