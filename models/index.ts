import axios from 'axios'
import { message } from 'antd'
import { createContext, useContext } from 'react'
import { flow, Instance, types } from 'mobx-state-tree'
import { User, UserStore } from './UserStore'
import { Author, AuthorStore } from './AuthorStore'
import { Blog, BlogStore } from './BlogStore'
import { Comment, CommentStore } from './CommentStore'
import { getApiUrl } from '../lib/views'
import { ApiEnum } from '../types'

export const RootStore = types
  .model('RootStore', {
    user: UserStore,
    blog: BlogStore,
    author: AuthorStore,
    comment: CommentStore,
  })
  .actions(self => {
    const update = (newData: {
      blogs: Instance<typeof Blog>[]
      users: Instance<typeof User>[]
      authors: Instance<typeof Author>[]
      comments: Instance<typeof Comment>[]
    }) => {
      self.user.data.replace(newData.users)
      self.author.data.replace(newData.authors)
      self.blog.data.replace(newData.blogs)
      self.comment.data.replace(newData.comments)
    }

    return {
      addUser: flow(function* add(user: typeof User) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.AddUser),
          user,
        )

        update(newData)
        yield message.success('添加成功')
      }),

      delUser: flow(function* del(id: number) {
        try {
          const { data: newData } = yield axios.post(
            getApiUrl(ApiEnum.DelUser),
            { id },
          )
          update(newData)
          yield message.success('删除成功')
        } catch (err: any) {
          yield message.error(err?.response.data)
        }
      }),

      updateUser: flow(function* ({ id, name }: { id: number; name: string }) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.UpdateUser),
          {
            name,
            id,
          },
        )

        update(newData)
        yield message.success('更新成功')
      }),

      addAuthor: flow(function* add(author: typeof Author) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.AddAuthor),
          author,
        )

        update(newData)
        yield message.success('添加成功')
      }),

      delAuthor: flow(function* del(id: number) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.DelAuthor),
          { id },
        )

        update(newData)
        yield message.success('删除成功')
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

        update(newData)
        yield message.success('更新成功')
      }),

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

        update(newData)
        yield message.success('添加成功')
      }),

      delBlog: flow(function* (id: number) {
        const { data: newData } = yield axios.post(getApiUrl(ApiEnum.DelBlog), {
          id,
        })

        update(newData)
        yield message.success('删除成功')
      }),

      findBlog: flow(function* (id: number) {
        console.log(id)
        const { data: newData } = yield axios.get(getApiUrl(ApiEnum.FindBlog), {
          params: {
            id,
          },
        })

        update(newData)
        yield message.success('查询成功')
      }),

      addComment: flow(function* (data: Instance<typeof Comment>) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.AddComment),
          data,
        )
        update(newData)
        yield message.success('添加成功')
      }),

      delComment: flow(function* (id: number) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.DelComment),
          { id },
        )

        update(newData)
        yield message.success('删除成功')
      }),
    }
  })

export const StoreContext = createContext<Instance<typeof RootStore>>(
  null as any,
)

export const useStores = () => useContext(StoreContext)
