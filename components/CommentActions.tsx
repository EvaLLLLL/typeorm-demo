import { Button } from 'antd'
import React from 'react'
import { ActionTypeEnum } from '../types'
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

      {[ActionTypeEnum.Add, ActionTypeEnum.Del].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionTypeEnum.Add) {
              toggleAddModalVisible()
            }

            if (type === ActionTypeEnum.Del) {
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
