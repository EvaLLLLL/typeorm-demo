import axios from 'axios'
import { flow, getRoot, types } from 'mobx-state-tree'
import { getApiUrl } from '../lib/views'
import { ApiEnum } from '../types'
import { message } from 'antd'
import { Store } from './index'

const ReferenceBlog = types.model('ReferenceBlogs', {
  id: types.number,
  title: types.string,
})

export const Author = types.model('Author', {
  id: types.identifierNumber,
  name: types.string,
  userId: types.number,
  blogs: types.maybeNull(types.array(ReferenceBlog)),
})

export const AuthorStore = types
  .model('AuthorStore', {
    data: types.array(Author),
    addModalVisible: false,
    delModalVisible: false,
    updateModalVisible: false,
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

      toggleUpdateModalVisible() {
        self.updateModalVisible = !self.updateModalVisible
      },

      addAuthor: flow(function* add(author: typeof Author) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.AddAuthor),
          author,
        )

        updateAll(newData)
        message.success('添加成功')
      }),

      delAuthor: flow(function* del(id: number) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.DelAuthor),
          {
            id,
          },
        )

        updateAll(newData)
        message.success('删除成功')
      }),

      updateAuthor: flow(function* ({
        id,
        name,
      }: {
        id: number
        name: string
      }) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.UpdateAuthor),
          {
            name,
            id,
          },
        )

        updateAll(newData)
        message.success('更新成功')
      }),
    }
  })
