import { types } from 'mobx-state-tree'

export const Author = types.model({
  id: types.identifierNumber,
  name: types.string,
  userId: types.number,
})
