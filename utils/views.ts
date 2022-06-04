import { ApiEnum, DataTypeEnum } from '../types'

export const dataTypeToLabel = (type: DataTypeEnum) =>
  ({
    [DataTypeEnum.User]: 'Users',
    [DataTypeEnum.Author]: 'Authors',
    [DataTypeEnum.Blog]: 'Blogs',
    [DataTypeEnum.Comment]: 'Comments',
  }[type])

export const getApiUrl = (type: ApiEnum) =>
  ({
    [ApiEnum.AddUser]: '/api/user/add',
    [ApiEnum.DelUser]: '/api/user/del',
    [ApiEnum.UpdateUser]: '/api/user/update',
    [ApiEnum.AddAuthor]: '/api/author/add',
    [ApiEnum.DelAuthor]: '/api/author/del',
    [ApiEnum.UpdateAuthor]: '/api/author/update',
    [ApiEnum.AddBlog]: '/api/blog/add',
    [ApiEnum.DelBlog]: '/api/blog/del',
    [ApiEnum.FindBlog]: '/api/blog/find',
    [ApiEnum.AddComment]: '/api/comment/add',
    [ApiEnum.DelComment]: '/api/comment/del',
  }[type])
