import { Button } from 'antd'
import React from 'react'
import { AddUserModal, DelUserModal, UpdateUserModal } from './UserModals'
import { ActionType } from '../types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../models'

export const UserActions = observer(() => {
  const { user: userStore } = useStores()
  return (
    <>
      <AddUserModal />
      <DelUserModal />
      <UpdateUserModal />

      {[ActionType.Add, ActionType.Del, ActionType.Update].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              userStore.toggleAddModalVisible()
            }

            if (type === ActionType.Del) {
              userStore.toggleDelModalVisible()
            }

            if (type === ActionType.Update) {
              userStore.toggleUpdateModalVisible()
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
})
