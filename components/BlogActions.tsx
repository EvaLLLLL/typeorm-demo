import { Button } from 'antd'
import React from 'react'
import { ActionTypeEnum } from '../types'
import { AddBlogModal, DelBlogModal, FindBlogModal } from './BlogModals'
import { observer } from 'mobx-react-lite'
import { useStores } from '../store'

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

      {[ActionTypeEnum.Add, ActionTypeEnum.Del, ActionTypeEnum.Find].map(type => (
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

            if (type === ActionTypeEnum.Find) {
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
