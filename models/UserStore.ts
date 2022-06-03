import { types } from 'mobx-state-tree'
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
  }))
