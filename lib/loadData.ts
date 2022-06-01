import { getDatabaseConnection } from './getDatabaseConnection'
import { Blog } from '../src/entity/Blog'
import { User } from '../src/entity/User'
import { Author } from '../src/entity/Author'
import { Comment } from '../src/entity/Comment'

export const loadData = async () => {
  let connection = await getDatabaseConnection()
  const blogsData = await connection.manager.find(Blog, {
    relations: ['authors', 'comments'],
    order: { updatedAt: -1 },
  })
  const usersData = await connection.manager.find(User, {
    relations: ['author'],
    order: { id: -1 },
  })

  const authorsData = await connection.manager.find(Author, {
    relations: ['user', 'blogs'],
    order: { id: -1 },
  })

  const commentsData = await connection.manager.find(Comment, {
    order: { id: -1 },
  })

  const parseData = (data: any) => JSON.parse(JSON.stringify(data))

  return {
    blogs: parseData(blogsData),
    users: parseData(usersData),
    authors: parseData(authorsData),
    comments: parseData(commentsData),
  }
}
