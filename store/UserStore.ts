import axios from 'axios'
import { flow, getParent, types } from 'mobx-state-tree'
import { getApiUrl } from '../lib/views'
import { ApiEnum } from '../types'
import { message } from 'antd'
import { Store } from './index'

export const User = types.model('User', {
  id: types.identifierNumber,
  name: types.string,
  age: types.optional(types.number, 0),
  author: types.maybeNull(
    types.model({
      id: types.identifierNumber,
      name: types.string,
    }),
  ),
})

export const UserStore = types
  .model('UserStore', {
    data: types.array(User),
    addModalVisible: false,
    delModalVisible: false,
    updateModalVisible: false,
  })
  .views(self => ({
    get totalCount() {
      return self.data.length
    },
  }))
  .actions(self => {
    const { updateAll } = getParent<Store>(self)

    return {
      toggleAddModalVisible() {
        self.addModalVisible = !self.addModalVisible
      },

      toggleDelModalVisible() {
        self.delModalVisible = !self.delModalVisible
      },

      toggleUpdateModalVisible() {
        self.updateModalVisible = !self.updateModalVisible
      },

      addUser: flow(function* add(user: typeof User) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.AddUser),
          user,
        )

        updateAll(newData)
        message.success('添加成功')
      }),

      delUser: flow(function* del(id: number) {
        try {
          const { data: newData } = yield axios.post(
            getApiUrl(ApiEnum.DelUser),
            {
              id,
            },
          )
          updateAll(newData)
          message.success('删除成功')
        } catch (err: any) {
          message.error(err?.response.data)
        }
      }),

      updateUser: flow(function* ({ id, name }: { id: number; name: string }) {
        const { data: newData } = yield axios.post(
          getApiUrl(ApiEnum.UpdateUser),
          {
            name,
            id,
          },
        )

        updateAll(newData)
        message.success('更新成功')
      }),
    }
  })
