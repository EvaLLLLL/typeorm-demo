import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Blog } from './entity/Blog'

createConnection()
  .then(async connection => {
    const posts = await connection.manager.find(Blog)

    if (posts.length === 0) {
      await connection.manager.save(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
          return new Blog({ title: `post${n}`, content: `my #${n} post` })
        }),
      )
    }

    console.log('数据填充完毕')

    await connection.close()
  })
  .catch(error => console.log(error))
