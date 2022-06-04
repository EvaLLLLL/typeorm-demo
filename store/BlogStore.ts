import axios from 'axios'
import { flow, getParent, types } from 'mobx-state-tree'
import { getApiUrl } from '../utils/views'
import { ApiEnum } from '../types'
import { message } from 'antd'
import { Store } from './index'

export const Blog = types.model('Blog', {
  id: types.identifierNumber,
  title: types.string,
  content: types.string,
  comments: types.maybeNull(
    types.array(
      types.model({
        id: types.identifierNumber,
        content: types.string,
      }),
    ),
  ),
  authors: types.maybeNull(
    types.array(
      types.model({
        id: types.identifierNumber,
        name: types.string,
      }),
    ),
  ),
  createdAt: types.string,
  updatedAt: types.string,
})

export const BlogStore = types
  .model('BlogStore', {
    data: types.array(Blog),
    addModalVisible: false,
    delModalVisible: false,
    findModalVisible: false,
  })
  .views(self => ({
    get totalCount() {
      return self.data.length
    },
  }))
  .actions(self => {
    const { updateAll } = getParent<Store>(self)

    return {
      toggleAddModalVisible() {
        self.addModalVisible = !self.addModalVisible
      },

      toggleDelModalVisible() {
        self.delModalVisible = !self.delModalVisible
      },

      toggleFindModalVisible() {
        self.findModalVisible = !self.findModalVisible
      },

      addBlog: flow(function* ({
        title,
        content,
        authorIds,
      }: {
        title: string
        content: string
        authorIds: number[]
      }) {
        const { data: newData } = yield axios.post(getApiUrl(ApiEnum.AddBlog), {
          title,
          content,
          authorIds,
        })

        updateAll(newData)
        message.success('添加成功')
      }),

      delBlog: flow(function* (id: number) {
        const { data: newData } = yield axios.post(getApiUrl(ApiEnum.DelBlog), {
          id,
        })

        updateAll(newData)
        message.success('删除成功')
      }),

      findBlog: flow(function* (id: number) {
        const { data: newData } = yield axios.get(getApiUrl(ApiEnum.FindBlog), {
          params: {
            id,
          },
        })

        updateAll(newData)
        message.success('查询成功')
      }),
    }
  })
