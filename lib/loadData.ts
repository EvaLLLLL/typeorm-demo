import { Blog } from '../typeorm/entity/Blog'
import { User } from '../typeorm/entity/User'
import { Author } from '../typeorm/entity/Author'
import { Comment } from '../typeorm/entity/Comment'
import { Connection } from 'typeorm'

const parseData = (data: any) => JSON.parse(JSON.stringify(data))

export const loadData = async (connection?: Connection) => {
  const blogsData = await connection?.manager.find(Blog, {
    relations: ['authors', 'comments'],
    order: { updatedAt: -1 },
  })
  const usersData = await connection?.manager.find(User, {
    relations: ['author'],
    order: { id: -1 },
  })

  const authorsData = await connection?.manager.find(Author, {
    relations: ['user', 'blogs'],
    order: { id: -1 },
  })

  const commentsData = await connection?.manager.find(Comment, {
    order: { id: -1 },
  })

  return {
    blogs: parseData(blogsData) as Blog[],
    users: parseData(usersData) as User[],
    authors: parseData(authorsData) as Author[],
    comments: parseData(commentsData) as Comment[],
  }
}
