import { types } from 'mobx-state-tree'
import { AuthorStore } from './AuthorStore'
import { CommentStore } from './CommentStore'

export const BlogStore = types.model({
  id: types.identifierNumber,
  title: types.string,
  content: types.string,
  comments: types.reference(CommentStore),
  authors: types.reference(AuthorStore),
  createdAt: types.Date,
  updatedAt: types.Date,
})
