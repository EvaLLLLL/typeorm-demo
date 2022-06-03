import { Blog } from './typeorm/entity/Blog'
import { User } from './typeorm/entity/User'
import { Comment } from './typeorm/entity/Comment'
import { Author } from './typeorm/entity/Author'

export enum DataTypeEnum {
  User = 'user',
  Blog = 'blog',
  Comment = 'comment',
  Author = 'author',
}

export enum ActionTypeEnum {
  Add = 'add',
  Del = 'del',
  Update = 'upd',
  Find = 'find',
}

export enum ApiEnum {
  AddUser = 'addUser',
  DelUser = 'delUser',
  UpdateUser = 'updateUser',
  AddAuthor = 'addAuthor',
  DelAuthor = 'delAuthor',
  UpdateAuthor = 'updateAuthor',
  AddBlog = 'addBlog',
  DelBlog = 'delBlog',
  FindBlog = 'findBlog',
  AddComment = 'addComment',
  DelComment = 'delComment',
}

export type Data = {
  users: User[]
  blogs: Blog[]
  authors: Author[]
  comments: Comment[]
}
