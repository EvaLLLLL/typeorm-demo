import { Blog } from './src/entity/Blog'
import { User } from './src/entity/User'
import { Comment } from './src/entity/Comment'
import { Author } from './src/entity/Author'

export enum DataType {
  User = 'user',
  Blog = 'blog',
  Comment = 'comment',
  Author = 'author',
}

export enum ActionType {
  Add = 'add',
  Del = 'del',
  Update = 'update',
}

export type DataSourceType = User[] | Blog[] | Comment[] | Author[]
