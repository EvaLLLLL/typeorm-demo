import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getConnection } from '../../../utils/getConnection'
import { User } from '../../../typeorm/entity/User'
import { loadData } from '../../../utils/loadData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getConnection()
  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let user = new User(req.body)
  await connection.manager.save(user)
  let data = await loadData(connection)
  res.status(200).json(data)
}
