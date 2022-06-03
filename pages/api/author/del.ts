import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { loadData } from '../../../lib/loadData'
import { Data } from '../../../types'
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

  let author = await connection.manager.findOne(Author, {
    where: [{ id: req.body.id }],
  })

  await connection.manager.remove(author)

  let data = await loadData(connection)
  res.status(200).json(data)
}
