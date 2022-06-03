import React from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { AddUserModal, DelUserModal, UpdateUserModal } from './UserModals'
import { ActionTypeEnum } from '../types'
import { useStores } from '../models'

export const UserActions = observer(() => {
  const { user: userStore } = useStores()
  return (
    <>
      <AddUserModal />
      <DelUserModal />
      <UpdateUserModal />

      {[ActionTypeEnum.Add, ActionTypeEnum.Del, ActionTypeEnum.Update].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionTypeEnum.Add) {
              userStore.toggleAddModalVisible()
            }

            if (type === ActionTypeEnum.Del) {
              userStore.toggleDelModalVisible()
            }

            if (type === ActionTypeEnum.Update) {
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
