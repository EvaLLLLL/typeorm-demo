import { Button } from 'antd'
import React from 'react'
import { AddUserModal, DelUserModal, UpdateUserModal } from './UserModals'
import { ActionType, Data } from '../types'

export const UserActions: React.FC<{ updateData: (newData: Data) => void }> = ({
  updateData,
}) => {
  const [addUserModalVisible, setAddUserModalVisible] = React.useState(false)
  const [delUserModalVisible, setDelUserModalVisible] = React.useState(false)
  const [updateUserModalVisible, setUpdateUserModalVisible] =
    React.useState(false)

  return (
    <>
      <AddUserModal
        visible={addUserModalVisible}
        onCancel={() => setAddUserModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setAddUserModalVisible(false)
        }}
      />

      <DelUserModal
        visible={delUserModalVisible}
        onCancel={() => setDelUserModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setDelUserModalVisible(false)
        }}
      />

      <UpdateUserModal
        visible={updateUserModalVisible}
        onCancel={() => setUpdateUserModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setUpdateUserModalVisible(false)
        }}
      />

      {[ActionType.Add, ActionType.Del, ActionType.Update].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              setAddUserModalVisible(true)
            }

            if (type === ActionType.Del) {
              setDelUserModalVisible(true)
            }

            if (type === ActionType.Update) {
              setUpdateUserModalVisible(true)
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
}
