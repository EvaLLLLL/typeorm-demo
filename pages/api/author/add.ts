import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { User } from '../../../src/entity/User'
import { loadData } from '../../../lib/loadData'
import { Author } from '../../../src/entity/Author'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getDatabaseConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let { name, userId } = req.body
  let author = new Author({ name })

  let user = await connection.manager.findOne(User, {
    where: [{ id: userId }],
  })

  if (!user) {
    res.status(500).json('Can not find user!')
    return
  }

  author.user = user

  await connection.manager.save(author)

  let data = await loadData(connection)
  res.status(200).json(data)
}
