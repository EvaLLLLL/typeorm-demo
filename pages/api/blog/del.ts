import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { loadData } from '../../../lib/loadData'
import { Data } from '../../../types'
import { Blog } from '../../../src/entity/Blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getDatabaseConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let blog = await connection.manager.findOne(Blog, {
    where: [{ id: req.body.id }],
  })

  await connection.manager.remove(blog)

  let data = await loadData(connection)
  res.status(200).json(data)
}
