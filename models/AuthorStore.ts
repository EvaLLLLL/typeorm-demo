import { types } from 'mobx-state-tree'

const ReferenceBlogs = types.model('ReferenceBlogs', {
  id: types.number,
  title: types.string,
})

export const Author = types.model('Author', {
  id: types.identifierNumber,
  name: types.string,
  userId: types.number,
  blogs: types.maybeNull(types.array(ReferenceBlogs)),
})

export const AuthorStore = types
  .model('AuthorStore', {
    data: types.array(Author),
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
  }))
