import { Button } from 'antd'
import React from 'react'
import { ActionType } from '../types'
import {
  AddAuthorModal,
  DelAuthorModal,
  UpdateAuthorModal,
} from './AuthorModals'
import { useStores } from '../models'
import { observer } from 'mobx-react-lite'

export const AuthorActions = observer(() => {
  const { author: authorStore } = useStores()

  return (
    <>
      <AddAuthorModal />
      <DelAuthorModal />
      <UpdateAuthorModal />

      {[ActionType.Add, ActionType.Del, ActionType.Update].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              authorStore.toggleAddModalVisible()
            }

            if (type === ActionType.Del) {
              authorStore.toggleDelModalVisible()
            }

            if (type === ActionType.Update) {
              authorStore.toggleUpdateModalVisible()
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
})
