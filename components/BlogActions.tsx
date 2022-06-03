import { Button } from 'antd'
import React from 'react'
import { ActionType } from '../types'
import { AddBlogModal, DelBlogModal, FindBlogModal } from './BlogModals'
import { observer } from 'mobx-react-lite'
import { useStores } from '../models'

export const BlogActions = observer(() => {
  const { blog: blogStore } = useStores()
  const {
    toggleAddModalVisible,
    toggleFindModalVisible,
    toggleDelModalVisible,
  } = blogStore

  return (
    <>
      <AddBlogModal />
      <DelBlogModal />
      <FindBlogModal />

      {[ActionType.Add, ActionType.Del, ActionType.Find].map(type => (
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

            if (type === ActionType.Find) {
              toggleFindModalVisible()
            }
          }}
        >
          {type}
        </Button>
      ))}
    </>
  )
})
