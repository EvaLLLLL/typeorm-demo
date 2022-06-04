import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Blog } from './entity/Blog'

createConnection()
  .then(async connection => {
    let blogRepository = connection.getRepository(Blog)
    await blogRepository.find({ relations: ['authors'] })
  })
  .catch(error => console.log(error))
