import { types, Instance, flow } from 'mobx-state-tree'
import { User, UserStore } from './UserStore'
import { Author, AuthorStore } from './AuthorStore'
import { createContext, useContext } from 'react'
import { Data } from '../types'
import axios from 'axios'
import { message } from 'antd'

export const RootStore = types
  .model('RootStore', {
    user: UserStore,
    author: AuthorStore,
    // blog: BlogStore,
    // comment: CommentStore,
  })
  .actions(self => {
    const update = (newData: Data) => {
      self.user.data.replace(newData.users)
      self.author.data.replace(newData.authors)
    }

    return {
      addUser: flow(function* add(user: typeof User) {
        const { data: newData } = yield axios.post('/api/user/add', user)

        update(newData)
        message.success('添加成功')
      }),

      delUser: flow(function* del(id: number) {
        try {
          const { data: newData } = yield axios.post('/api/user/del', { id })
          update(newData)
          message.success('删除成功')
        } catch (err) {
          message.error(err.response.data)
        }
      }),

      updateUser: flow(function* ({ id, name }: { id: number; name: string }) {
        const { data: newData } = yield axios.post('/api/user/update', {
          name,
          id,
        })

        update(newData)
        message.success('更新成功')
      }),

      addAuthor: flow(function* add(author: typeof Author) {
        const { data: newData } = yield axios.post('/api/author/add', author)

        update(newData)
        message.success('添加成功')
      }),

      delAuthor: flow(function* del(id: number) {
        const { data: newData } = yield axios.post('/api/author/del', { id })

        update(newData)
        message.success('删除成功')
      }),

      updateAuthor: flow(function* ({
        id,
        name,
      }: {
        id: number
        name: string
      }) {
        const { data: newData } = yield axios.post('/api/author/update', {
          name,
          id,
        })

        update(newData)
        message.success('更新成功')
      }),
    }
  })

export const StoreContext = createContext<Instance<typeof RootStore>>(
  null as any,
)

export const useStores = () => useContext(StoreContext)
