import { Button } from 'antd'
import React from 'react'
import { ActionTypeEnum } from '../types'
import {
  AddAuthorModal,
  DelAuthorModal,
  UpdateAuthorModal,
} from './AuthorModals'
import { useStores } from '../store'
import { observer } from 'mobx-react-lite'

export const AuthorActions = observer(() => {
  const { author: authorStore } = useStores()

  return (
    <>
      <AddAuthorModal />
      <DelAuthorModal />
      <UpdateAuthorModal />

      {[ActionTypeEnum.Add, ActionTypeEnum.Del, ActionTypeEnum.Update].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionTypeEnum.Add) {
              authorStore.toggleAddModalVisible()
            }

            if (type === ActionTypeEnum.Del) {
              authorStore.toggleDelModalVisible()
            }

            if (type === ActionTypeEnum.Update) {
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
