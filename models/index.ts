import { types, unprotect } from 'mobx-state-tree'
import { UserStore } from './UserStore'
import { Data } from '../types'

export const RootStore = types.model('RootStore', {
  user: UserStore,
  // author: AuthorStore,
  // blog: BlogStore,
  // comment: CommentStore,
})
