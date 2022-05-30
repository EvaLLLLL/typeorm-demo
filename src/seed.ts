import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Blog } from './entity/Blog'
import { Author } from './entity/Author'

createConnection()
  .then(async connection => {
    let blog1 = new Blog({ title: 'blog1', content: 'this is blog1' })
    let blog2 = new Blog({ title: 'blog2', content: 'this is blog2' })

    let blogRepository = connection.getRepository(Blog)
    await blogRepository.save([blog1, blog2])

    let author = new Author({ name: 'max' })
    author.blogs = [blog1, blog2]

    let authorRepository = connection.getRepository(Author)
    await authorRepository.save(author)

    let blogs = await blogRepository.find({ relations: ['authors'] })
    console.log(blogs)
  })
  .catch(error => console.log(error))
