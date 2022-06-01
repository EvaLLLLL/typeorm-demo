import React from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import JSONPretty from 'react-json-pretty'
import { Button, Card, Form, message } from 'antd'
import { ActionType, Data, DataSourceType, DataType } from '../types'
import { dataTypeToLabel } from '../lib/views'
import { AddUserModal, DelUserModal, UpdateUserModal } from './UserModals'

export const DataItem: React.FC<{
  setData: React.Dispatch<React.SetStateAction<Data>>
  dataSource: DataSourceType
  dataType: DataType
}> = ({ dataSource, dataType, setData }) => {
  const [addUserModalVisible, setAddUserModalVisible] = React.useState(false)
  const [delUserModalVisible, setDelUserModalVisible] = React.useState(false)
  const [updateUserModalVisible, setUpdateUserModalVisible] =
    React.useState(false)
  const [addUserForm] = Form.useForm()
  const [delUserForm] = Form.useForm()
  const [updateUserForm] = Form.useForm()

  return (
    <>
      <UpdateUserModal
        form={updateUserForm}
        visible={updateUserModalVisible}
        onCancel={() => setUpdateUserModalVisible(false)}
        onOk={async () => {
          const values = await updateUserForm.validateFields()
          if (!values) return

          const { data: newData } = await axios.post('/api/user/update', values)
          setData(newData)
          message.success('更新成功')
          setUpdateUserModalVisible(false)
        }}
      />

      <AddUserModal
        form={addUserForm}
        visible={addUserModalVisible}
        onCancel={() => setAddUserModalVisible(false)}
        onOk={async () => {
          const values = await addUserForm.validateFields()
          if (!values) return

          const { data: newData } = await axios.post('/api/user/add', values)
          setData(newData)
          message.success('添加成功')
          setAddUserModalVisible(false)
        }}
      />

      <DelUserModal
        form={delUserForm}
        visible={delUserModalVisible}
        onCancel={() => {
          setDelUserModalVisible(false)
        }}
        onOk={async () => {
          const values = await delUserForm.validateFields()
          if (!values) return

          const { data: newData } = await axios.post('/api/user/del', values)
          setData(newData)
          message.success('删除成功')
          setDelUserModalVisible(false)
        }}
      />

      <div className={styles.dataItem}>
        <Card
          title={dataTypeToLabel(dataType)}
          size="small"
          extra={[ActionType.Add, ActionType.Del, ActionType.Update].map(
            type => (
              <Button
                key={type}
                style={{ margin: '0 2px' }}
                type="primary"
                onClick={() => {
                  if (type === ActionType.Add && dataType === DataType.User) {
                    setAddUserModalVisible(true)
                  }

                  if (type === ActionType.Del && dataType === DataType.User) {
                    setDelUserModalVisible(true)
                  }

                  if (
                    type === ActionType.Update &&
                    dataType === DataType.User
                  ) {
                    setUpdateUserModalVisible(true)
                  }
                }}
              >
                {type}
              </Button>
            ),
          )}
        >
          <JSONPretty id="json-pretty" data={dataSource}></JSONPretty>
        </Card>
      </div>
    </>
  )
}
