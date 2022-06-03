import axios from 'axios'
import { flow, getRoot, Instance, types } from 'mobx-state-tree'
import { getApiUrl } from '../lib/views'
import { ApiEnum } from '../types'
import { message } from 'antd'
import { Store } from './index'

export const Comment = types.model('Comment', {
  id: types.identifierNumber,
  content: types.string,
  userId: types.number,
  blogId: types.number,
})

export const CommentStore = types
  .model('CommentStore', {
    data: types.array(Comment),
    addModalVisible: false,
    delModalVisible: false,
  })
  .views(self => ({
    get totalCount() {
      return self.data.length
    },
  }))
  .actions(self => {
    const { updateAll } = getRoot<Store>(self)

    return {
      toggleAddModalVisible() {
        self.addModalVisible = !self.addModalVisible
      },

      toggleDelModalVisible() {
        self.delModalVisible = !self.delModalVisible
      },

      addComment: flow(function* (data: Instance<typeof Comment>) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.AddComment),
          data,
        )
        updateAll(newData)
        message.success('添加成功')
      }),

      delComment: flow(function* (id: number) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.DelComment),
          { id },
        )

        updateAll(newData)
        message.success('删除成功')
      }),
    }
  })
