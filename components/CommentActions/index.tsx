import { Button } from 'antd'
import React from 'react'
import { useStore } from '../../store'
import { AddCommentModal } from './AddCommentModal'
import { DelCommentModal } from './DelCommentModal'
import { ActionTypeEnum } from '../../types'

export const CommentActions: React.FC = () => {
  const { comment: commentStore } = useStore()
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
}
