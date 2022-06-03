import 'reflect-metadata'
import config from '../ormconfig.json'
import { createConnection, getConnectionManager } from 'typeorm'
import { Blog } from '../typeorm/entity/Blog'
import { Author } from '../typeorm/entity/Author'
import { User } from '../typeorm/entity/User'
import { Comment } from '../typeorm/entity/Comment'

const create = function () {
  try {
    // @ts-ignore
    return createConnection({
      ...config,
      entities: [User, Author, Blog, Comment],
    })
  } catch (err) {
    console.log('Database connection Error!')
    console.error(err)
    console.log('Database connection Error!')
    return undefined
  }
}

const promise = (async function () {
  const manager = getConnectionManager()
  const current = manager.has('default') && manager.get('default')
  if (current) {
    await current.close()
  }
  return create()
})()

export const getDatabaseConnection = async () => {
  return promise
}
