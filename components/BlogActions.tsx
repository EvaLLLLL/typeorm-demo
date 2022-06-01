import { Button } from 'antd'
import React from 'react'
import { ActionType, Data } from '../types'
import { AddBlogModal } from './BlogModals'
import { Author } from '../src/entity/Author'

export const BlogActions: React.FC<{
  authors: Author[]
  updateData: (newData: Data) => void
}> = ({ updateData, authors }) => {
  const [addBlogModalVisible, setAddBlogModalVisible] = React.useState(false)

  return (
    <>
      <AddBlogModal
        authors={authors}
        visible={addBlogModalVisible}
        onCancel={() => setAddBlogModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setAddBlogModalVisible(false)
        }}
      />

      {[ActionType.Add, ActionType.Del].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              setAddBlogModalVisible(true)
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
}
