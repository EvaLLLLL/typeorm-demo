import 'reflect-metadata'
import { createConnection, getConnectionManager } from 'typeorm'
import { Blog } from '../src/entity/Blog'
import { Author } from '../src/entity/Author'
import { User } from '../src/entity/User'
import { Comment } from '../src/entity/Comment'
import config from '../ormconfig.json'

const create = () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Blog, Author, User, Comment],
  })
}

const connectionPromise = (async () => {
  const manager = getConnectionManager()

  const currentConnection = manager.has('default') && manager.get('default')

  if (currentConnection && currentConnection.isConnected) {
    await currentConnection.close()
  }

  return create()
})()

export const getDatabaseConnection = () => {
  return connectionPromise
}
