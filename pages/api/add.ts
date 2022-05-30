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
  let user = new User({ name: '111' })
  await connection.manager.save(user)
  let users = await connection.manager.find(User)
  res.status(201).json({ users })
}
