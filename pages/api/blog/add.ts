import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { loadData } from '../../../lib/loadData'
import { Author } from '../../../src/entity/Author'
import { Blog } from '../../../src/entity/Blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let { title, content, authorIds } = req.body

  let blog = new Blog({ title, content })

  blog.authors = await connection.manager.find(Author, {
    where: authorIds.map(id => ({ id })),
  })

  await connection.manager.save(blog)

  let data = await loadData()
  res.status(200).json(data)
}
