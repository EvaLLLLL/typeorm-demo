import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { User } from '../../../src/entity/User'
import { loadData } from '../../../lib/loadData'
import { Author } from '../../../src/entity/Author'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let { name, userId } = req.body
  let author = new Author({ name })

  let user = await connection.manager.findOne(User, {
    where: [{ id: userId }],
  })

  console.log('-------------------------------------------')
  console.log(req.body, userId, user)
  console.log('-------------------------------------------')

  author.user = user

  await connection.manager.save(author)

  let data = await loadData()
  res.status(200).json(data)
}
