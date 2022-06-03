import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { loadData } from '../../../lib/loadData'
import { Data } from '../../../types'
import { Comment } from '../../../src/entity/Comment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getDatabaseConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  console.log(req.body)

  let comment = await connection.manager.findOne(Comment, {
    where: [{ id: req.body.id }],
  })

  await connection.manager.remove(comment)

  let data = await loadData(connection)
  res.status(200).json(data)
}
