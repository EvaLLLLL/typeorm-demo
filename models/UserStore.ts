import { flow, types } from 'mobx-state-tree'
import axios from 'axios'
import { message } from 'antd'
import { Author } from './AuthorStore'

export const User = types.model('User', {
  id: types.identifierNumber,
  name: types.string,
  age: types.optional(types.number, 0),
  author: types.maybeNull(Author),
})

export const UserStore = types
  .model('UserStore', {
    data: types.array(User),
    addModalVisible: false,
    delModalVisible: false,
    updateModalVisible: false,
  })
  .actions(self => ({
    toggleAddModalVisible() {
      self.addModalVisible = !self.addModalVisible
    },

    toggleDelModalVisible() {
      self.delModalVisible = !self.delModalVisible
    },

    toggleUpdateModalVisible() {
      self.updateModalVisible = !self.updateModalVisible
    },

    add: flow(function* add(user: typeof User) {
      const { data: newData } = yield axios.post('/api/user/add', user)

      self.data.replace(newData.users)
      message.success('添加成功')
    }),

    del: flow(function* del(id: number) {
      try {
        const { data: newData } = yield axios.post('/api/user/del', { id })
        self.data.replace(newData.users)
        message.success('删除成功')
      } catch (err) {
        message.error(err.response.data)
      }
    }),

    update: flow(function* ({ id, name }: { id: number; name: string }) {
      const { data: newData } = yield axios.post('/api/user/update', {
        name,
        id,
      })

      self.data.replace(newData.users)
      message.success('更新成功')
    }),
  }))
