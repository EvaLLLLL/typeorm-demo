import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { User } from '../../../src/entity/User'
import { loadData } from '../../../lib/loadData'
import { Author } from '../../../src/entity/Author'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let { name, userId } = req.body
  let author = new Author({ name })

  author.user = await connection.manager.findOne(User, {
    where: [{ id: userId }],
  })

  await connection.manager.save(author)

  let data = await loadData(connection)
  res.status(200).json(data)
}
