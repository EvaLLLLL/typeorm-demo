import { Button } from 'antd'
import React from 'react'
import { useStore } from '../../store'
import { ActionTypeEnum } from '../../types'
import { AddBlogModal } from './AddBlogModal'
import { DelBlogModal } from './DelBlogModal'
import { FindBlogModal } from './FindBlogModal'

export const BlogActions: React.FC = () => {
  const { blog: blogStore } = useStore()
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

      {[ActionTypeEnum.Add, ActionTypeEnum.Del, ActionTypeEnum.Find].map(
        type => (
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
        ),
      )}
    </>
  )
}
