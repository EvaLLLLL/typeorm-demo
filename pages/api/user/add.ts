import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { User } from '../../../src/entity/User'
import { loadData } from '../../../lib/loadData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let user = new User(req.body)
  await connection.manager.save(user)
  let data = await loadData(connection)
  res.status(200).json(data)
}
