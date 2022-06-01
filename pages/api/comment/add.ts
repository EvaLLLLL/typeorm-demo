import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection'
import { loadData } from '../../../lib/loadData'
import { Comment } from '../../../src/entity/Comment'
import { User } from '../../../src/entity/User'
import { Blog } from '../../../src/entity/Blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let connection = await getDatabaseConnection()
  let { content, userId, blogId } = req.body

  let comment = new Comment(content)

  comment.user = await connection.manager.findOne(User, {
    where: [{ id: userId }],
  })

  comment.blog = await connection.manager.findOne(Blog, {
    where: [{ id: blogId }],
  })

  await connection.manager.save(comment)

  let data = await loadData()
  res.status(200).json(data)
}
