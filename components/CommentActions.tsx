import { Button } from 'antd'
import React from 'react'
import { ActionType } from '../types'
import { AddCommentModal, DelCommentModal } from './CommentModals'
import { observer } from 'mobx-react-lite'
import { useStores } from '../models'

export const CommentActions = observer(() => {
  const { comment: commentStore } = useStores()
  const { toggleAddModalVisible, toggleDelModalVisible } = commentStore
  return (
    <>
      <AddCommentModal />
      <DelCommentModal />

      {[ActionType.Add, ActionType.Del].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              toggleAddModalVisible()
            }

            if (type === ActionType.Del) {
              toggleDelModalVisible()
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
})
