import 'reflect-metadata'
import config from '../ormconfig.json'
import { createConnection, Connection } from 'typeorm'
import { Blog } from '../typeorm/entity/Blog'
import { Author } from '../typeorm/entity/Author'
import { User } from '../typeorm/entity/User'
import { Comment } from '../typeorm/entity/Comment'

let connection: Connection

export const getConnection = async () => {
  if (connection) {
    return connection
  }

  try {
    // @ts-ignore
    connection = await createConnection({
      ...config,
      name: Math.random(),
      entities: [User, Author, Blog, Comment],
    })

    return connection
  } catch (e) {
    console.error(
      'Could not create a connection with the database, check settings!',
      e,
    )
    throw e
  }
}
