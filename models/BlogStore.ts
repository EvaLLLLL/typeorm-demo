import { types } from 'mobx-state-tree'

const ReferenceAuthor = types.model({
  id: types.identifierNumber,
  name: types.string,
})

const ReferenceComment = types.model({
  id: types.identifierNumber,
  content: types.string,
})

export const Blog = types.model('Blog', {
  id: types.identifierNumber,
  title: types.string,
  content: types.string,
  comments: types.maybeNull(types.array(ReferenceComment)),
  authors: types.maybeNull(types.array(ReferenceAuthor)),
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
  .actions(self => ({
    toggleAddModalVisible() {
      self.addModalVisible = !self.addModalVisible
    },

    toggleDelModalVisible() {
      self.delModalVisible = !self.delModalVisible
    },

    toggleFindModalVisible() {
      self.findModalVisible = !self.findModalVisible
    },
  }))
