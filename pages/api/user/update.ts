import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { User } from '../../../typeorm/entity/User'
import { loadData } from '../../../lib/loadData'

type Data = {
  users: User[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getDatabaseConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let user = await connection.manager.findOne(User, {
    where: [{ id: req.body.id }],
  })

  if (user) {
    user.name = req.body.name

    await connection.manager.save(user)

    let data = await loadData(connection)
    res.status(200).json(data)
  } else {
    res.status(500).json('Database connection Error!')
  }
}
