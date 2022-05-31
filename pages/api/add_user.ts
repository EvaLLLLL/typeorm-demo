import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../lib/getDatabaseConnection'
import { User } from '../../src/entity/User'
import { loadData } from '../../lib/loadData'
import { Data } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Data }>,
) {
  let connection = await getDatabaseConnection()
  let user = new User(req.body)
  console.log(req.body);
  await connection.manager.save(user)
  let data = await loadData()
  res.status(201).json({ data })
}
