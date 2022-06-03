import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { loadData } from '../../../lib/loadData'
import { Data } from '../../../types'
import { Blog } from '../../../typeorm/entity/Blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getDatabaseConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let blogs = await connection.manager.find(Blog, {
    relations: ['authors', 'comments'],
    where: { id: req.query.id },
  })

  let data = await loadData(connection)
  res.status(200).json({
    ...data,
    blogs,
  })
}
