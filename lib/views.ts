import { DataType } from '../types'

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
