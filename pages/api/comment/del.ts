import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../../lib/getConnection'
import { loadData } from '../../../lib/loadData'
import { Data } from '../../../types'
import { Comment } from '../../../typeorm/entity/Comment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let comment = await connection.manager.findOne(Comment, {
    where: [{ id: req.body.id }],
  })

  await connection.manager.remove(comment)

  let data = await loadData(connection)
  res.status(200).json(data)
}
