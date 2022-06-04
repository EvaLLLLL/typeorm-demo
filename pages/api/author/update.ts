import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../../utils/getConnection'
import { loadData } from '../../../utils/loadData'
import { Author } from '../../../typeorm/entity/Author'
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

  let author = await connection.manager.findOne(Author, {
    where: [{ id: req.body.id }],
  })

  if (!author) {
    res.status(500).json('Can not find author!')
    return
  }

  author.name = req.body.name

  await connection.manager.save(author)

  let data = await loadData(connection)
  res.status(200).json(data)
}
