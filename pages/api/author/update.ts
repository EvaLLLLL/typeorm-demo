import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { loadData } from '../../../lib/loadData'
import { Author } from '../../../src/entity/Author'
import { Data } from '../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let author = await connection.manager.findOne(Author, {
    where: [{ id: req.body.id }],
  })

  author.name = req.body.name

  await connection.manager.save(author)

  let data = await loadData()
  res.status(200).json(data)
}
