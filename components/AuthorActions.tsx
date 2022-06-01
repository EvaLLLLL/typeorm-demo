import { Button } from 'antd'
import React from 'react'
import { ActionType, Data } from '../types'
import { AddAuthorModal, DelAuthorModal } from './AuthorModals'
import { User } from '../src/entity/User'

export const AuthorActions: React.FC<{
  users: User[]
  updateData: (newData: Data) => void
}> = ({ updateData, users }) => {
  const [addAuthorModalVisible, setAddAuthorModalVisible] =
    React.useState(false)
  const [delAuthorModalVisible, setDelAuthorModalVisible] =
    React.useState(false)

  return (
    <>
      <AddAuthorModal
        users={users}
        visible={addAuthorModalVisible}
        onCancel={() => setAddAuthorModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setAddAuthorModalVisible(false)
        }}
      />

      <DelAuthorModal
        visible={delAuthorModalVisible}
        onCancel={() => setDelAuthorModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setDelAuthorModalVisible(false)
        }}
      />

      {[ActionType.Add, ActionType.Del, ActionType.Update].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              setAddAuthorModalVisible(true)
            }

            if (type === ActionType.Del) {
              setDelAuthorModalVisible(true)
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
}
