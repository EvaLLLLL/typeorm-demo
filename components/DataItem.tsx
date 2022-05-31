import React from 'react'
import styles from '../styles/Home.module.css'
import { Button, Card, Form, message } from 'antd'
import { ActionType, Data, DataSourceType, DataType } from '../types'
import { dataTypeToLabel } from '../lib/views'
import JSONPretty from 'react-json-pretty'
import { AddUserModal } from './AddUserModal'
import axios from 'axios'

export const DataItem: React.FC<{
  data: Data
  setData: React.Dispatch<React.SetStateAction<Data>>
  dataSource: DataSourceType
  dataType: DataType
}> = ({ dataSource, dataType, data, setData }) => {
  const [addUserModalVisible, setAddUserModalVisible] = React.useState(false)
  const [addUserForm] = Form.useForm()
  
  return (
    <>
      <AddUserModal
        form={addUserForm}
        visible={addUserModalVisible}
        onCancel={() => setAddUserModalVisible(false)}
        onOk={async () => {
          const values = await addUserForm.validateFields()
          if (!values) return

          const { data: newData } = await axios.post('/api/add_user', values)
          setData(newData.data)
          message.success('添加成功')
          setAddUserModalVisible(false)
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
                onClick={() => setAddUserModalVisible(true)}
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
