import { Button } from 'antd'
import React from 'react'
import { ActionType, Data } from '../types'
import { User } from '../src/entity/User'
import { Blog } from '../src/entity/Blog'
import { AddCommentModal } from './CommentModals'

export const CommentActions: React.FC<{
  users: User[]
  blogs: Blog[]
  updateData: (newData: Data) => void
}> = ({ updateData, users, blogs }) => {
  const [addCommentModalVisible, setAddCommentModalVisible] =
    React.useState(false)

  return (
    <>
      <AddCommentModal
        users={users}
        blogs={blogs}
        visible={addCommentModalVisible}
        onCancel={() => setAddCommentModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setAddCommentModalVisible(false)
        }}
      />

      {[ActionType.Add, ActionType.Del].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              setAddCommentModalVisible(true)
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
}
