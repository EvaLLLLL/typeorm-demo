import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../../utils/getConnection'
import { User } from '../../../typeorm/entity/User'
import { loadData } from '../../../utils/loadData'
import { Data } from '../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let user = await connection.manager.findOne(User, {
    relations: ['author'],
    where: [{ id: req.body.id }],
  })

  if (user?.author !== null) {
    res.status(500).json('请先删除所关联 author')
  } else {
    await connection.manager.remove(user)
    let data = await loadData(connection)

    res.status(200).json(data)
  }
}
