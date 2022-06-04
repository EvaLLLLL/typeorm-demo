import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../../utils/getConnection'
import { loadData } from '../../../utils/loadData'
import { Data } from '../../../types'
import { Blog } from '../../../typeorm/entity/Blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getConnection()

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
