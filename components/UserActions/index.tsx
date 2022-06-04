import React from 'react'
import { Button } from 'antd'
import { ActionTypeEnum } from '../../types'
import { useStore } from '../../store'
import { AddUserModal } from './AddUserModal'
import { DelUserModal } from './DelUserModal'
import { UpdateUserModal } from './UpdateUserModal'

export const UserActions: React.FC = () => {
  const { user: userStore } = useStore()
  return (
    <>
      <AddUserModal />
      <DelUserModal />
      <UpdateUserModal />

      {[ActionTypeEnum.Add, ActionTypeEnum.Del, ActionTypeEnum.Update].map(
        type => (
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
        ),
      )}
    </>
  )
}
