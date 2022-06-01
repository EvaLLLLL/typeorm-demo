import { Button } from 'antd'
import React from 'react'
import { ActionType, Data } from '../types'
import { AddBlogModal, DelBlogModal, FindBlogModal } from './BlogModals'
import { Author } from '../src/entity/Author'

export const BlogActions: React.FC<{
  authors: Author[]
  updateData: (newData: Data) => void
}> = ({ updateData, authors }) => {
  const [addBlogModalVisible, setAddBlogModalVisible] = React.useState(false)
  const [delBlogModalVisible, setDelBlogModalVisible] = React.useState(false)
  const [findBlogModalVisible, setFindBlogModalVisible] = React.useState(false)

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

      <DelBlogModal
        visible={delBlogModalVisible}
        onCancel={() => setDelBlogModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setDelBlogModalVisible(false)
        }}
      />

      <FindBlogModal
        visible={findBlogModalVisible}
        onCancel={() => setFindBlogModalVisible(false)}
        onOk={newData => {
          updateData(newData)
          setFindBlogModalVisible(false)
        }}
      />

      {[ActionType.Add, ActionType.Del, ActionType.Find].map(type => (
        <Button
          key={type}
          type="primary"
          style={{ margin: '0 2px' }}
          onClick={() => {
            if (type === ActionType.Add) {
              setAddBlogModalVisible(true)
            }

            if (type === ActionType.Del) {
              setDelBlogModalVisible(true)
            }

            if (type === ActionType.Find) {
              setFindBlogModalVisible(true)
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
}
