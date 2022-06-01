import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { User } from '../../../src/entity/User'
import { loadData } from '../../../lib/loadData'
import { Data } from '../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getDatabaseConnection()
  let user = await connection.manager.findOne(User, {
    relations: ['author'],
    where: [{ id: req.body.id }],
  })

  if (user !== null && user.author !== null) {
    res.status(500).json('请先删除所关联 author')
  } else {
    await connection.manager.remove(user)
    let data = await loadData(connection)

    res.status(200).json(data)
  }
}
