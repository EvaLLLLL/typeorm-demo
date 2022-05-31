import { ActionType, DataType } from '../types'

export const actionTypeToLabel = (type: ActionType) => {
  return {
    [ActionType.Add]: '添加',
    [ActionType.Del]: '删除',
    [ActionType.Update]: '更新',
  }[type]
}

export const dataTypeToLabel = (type: DataType) => {
  return {
    [DataType.User]: 'Users',
    [DataType.Author]: 'Authors',
    [DataType.Blog]: 'Blogs',
    [DataType.Comment]: 'Comments',
  }[type]
}

export const dataTypeToKey = (type: DataType) => {
  return {
    [DataType.User]: 'users',
    [DataType.Author]: 'authors',
    [DataType.Blog]: 'blogs',
    [DataType.Comment]: 'comments',
  }[type]
}
