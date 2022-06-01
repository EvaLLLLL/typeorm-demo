import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../lib/getDatabaseConnection'
import { User } from '../../src/entity/User'
import { loadData } from '../../lib/loadData'
import { Data } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let user = await connection.manager.findOne(User, {
    where: [{ id: req.body.id }],
  })

  await connection.manager.remove(user)

  let data = await loadData()
  res.status(200).json(data)
}
