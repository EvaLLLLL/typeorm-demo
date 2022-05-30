import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../lib/getDatabaseConnection'
import { User } from '../../src/entity/User'

type Data = {
  users: User[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let user = await connection.manager.findOne(User, { order: { id: -1 } })
  user.name = 'jack'
  await connection.manager.save(user)

  let users = await connection.manager.find(User, { order: { id: -1 } })
  res.status(201).json({ users })
}
