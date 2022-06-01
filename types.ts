import { Blog } from './src/entity/Blog'
import { User } from './src/entity/User'
import { Comment } from './src/entity/Comment'
import { Author } from './src/entity/Author'
import { FormInstance } from 'antd'

export enum DataType {
  User = 'user',
  Blog = 'blog',
  Comment = 'comment',
  Author = 'author',
}

export enum ActionType {
  Add = 'add',
  Del = 'del',
  Update = 'upd',
}

export type DataSourceType = User[] | Blog[] | Comment[] | Author[]

export type Data = {
  users: User[]
  blogs: Blog[]
  authors: Author[]
  comments: Comment[]
}

export type ModalInnerProps = {
  form: FormInstance
  visible: boolean
  onCancel: () => void
  onOk: () => void
}

export type ModalProps = Omit<ModalInnerProps, 'form' | 'onOk'> & {
  onOk: (newData?: Data) => void
}
