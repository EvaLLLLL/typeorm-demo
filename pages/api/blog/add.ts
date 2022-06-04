import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getConnection } from '../../../lib/getConnection'
import { loadData } from '../../../lib/loadData'
import { Author } from '../../../typeorm/entity/Author'
import { Blog } from '../../../typeorm/entity/Blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>,
) {
  let connection = await getConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let { title, content, authorIds } = req.body

  let blog = new Blog({ title, content })

  blog.authors = await connection.manager.find(Author, {
    where: authorIds.map((id: number) => ({ id })),
  })

  await connection.manager.save(blog)

  let data = await loadData(connection)
  res.status(200).json(data)
}
