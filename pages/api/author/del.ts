import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../../lib/getConnection'
import { loadData } from '../../../lib/loadData'
import { Data } from '../../../types'
import { Author } from '../../../typeorm/entity/Author'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getConnection()

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
