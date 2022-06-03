import { types } from 'mobx-state-tree'

export const CommentStore = types.model({
  id: types.identifierNumber,
  content: types.string,
  // user: types.reference(UserStore),
  // author: types.reference(AuthorStore),
})
