import { Button } from 'antd'
import React from 'react'
import { AddUserModal, DelUserModal, UpdateUserModal } from './UserModals'
import { ActionType } from '../types'
import { Instance } from 'mobx-state-tree'
import { UserStore } from '../models/UserStore'
import { observer } from 'mobx-react-lite'

export const UserActions = observer<{ store: Instance<typeof UserStore> }>(
  ({ store: userStore }) => {
    return (
      <>
        <AddUserModal store={userStore} />
        <DelUserModal store={userStore} />
        <UpdateUserModal store={userStore} />

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
  },
)
