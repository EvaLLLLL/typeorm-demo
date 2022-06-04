import { Button } from 'antd'
import React from 'react'
import { useStore } from '../../store'
import { AddAuthorModal } from './AddAuthorModal'
import { DelAuthorModal } from './DelAuthorModal'
import { UpdateAuthorModal } from './UpdateAuthorModal'
import { ActionTypeEnum } from '../../types'

export const AuthorActions: React.FC = () => {
  const { author: authorStore } = useStore()

  return (
    <>
      <AddAuthorModal />
      <DelAuthorModal />
      <UpdateAuthorModal />

      {[ActionTypeEnum.Add, ActionTypeEnum.Del, ActionTypeEnum.Update].map(
        type => (
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
        ),
      )}
    </>
  )
}
