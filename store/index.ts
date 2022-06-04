import { createContext, useContext } from 'react'
import { Instance, types } from 'mobx-state-tree'
import { User, UserStore } from './UserStore'
import { Author, AuthorStore } from './AuthorStore'
import { Blog, BlogStore } from './BlogStore'
import { Comment, CommentStore } from './CommentStore'

export const RootStore = types
  .model('RootStore', {
    user: UserStore,
    blog: BlogStore,
    author: AuthorStore,
    comment: CommentStore,
  })
  .actions(self => ({
    updateAll(newData: {
      blogs: Instance<typeof Blog>[]
      users: Instance<typeof User>[]
      authors: Instance<typeof Author>[]
      comments: Instance<typeof Comment>[]
    }) {
      self.user.data.replace(newData.users)
      self.author.data.replace(newData.authors)
      self.blog.data.replace(newData.blogs)
      self.comment.data.replace(newData.comments)
    },
  }))

export type Store = typeof RootStore

export const StoreContext = createContext<Instance<typeof RootStore>>(
  null as any,
)

export const useStore = () => useContext(StoreContext)
