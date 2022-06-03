import { types } from 'mobx-state-tree'

export const Comment = types.model('Comment', {
  id: types.identifierNumber,
  content: types.string,
  userId: types.number,
  blogId: types.number,
})

export const CommentStore = types
  .model('CommentStore', {
    data: types.array(Comment),
    addModalVisible: false,
    delModalVisible: false,
  })
  .actions(self => ({
    toggleAddModalVisible() {
      self.addModalVisible = !self.addModalVisible
    },

    toggleDelModalVisible() {
      self.delModalVisible = !self.delModalVisible
    },
  }))
