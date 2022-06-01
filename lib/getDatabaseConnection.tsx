import 'reflect-metadata'
import { createConnection, getConnectionManager } from 'typeorm'
import { Blog } from '../src/entity/Blog'
import { Author } from '../src/entity/Author'
import { User } from '../src/entity/User'
import { Comment } from '../src/entity/Comment'
import config from '../ormconfig.json'

const create = () => {
  try {
    // @ts-ignore
    return createConnection({
      ...config,
      entities: [Blog, Author, User, Comment],
    })
  } catch (err) {
    console.log('Database connection Error!')
    console.error(err)
    console.log('Database connection Error!')
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
