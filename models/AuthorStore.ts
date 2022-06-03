import { flow, types, getParent, getRoot } from 'mobx-state-tree'
import axios from 'axios'
import { message } from 'antd'

export const Author = types.model('Author', {
  id: types.identifierNumber,
  name: types.string,
  userId: types.number,
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
