import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../types'
import { getConnection } from '../../../utils/getConnection'
import { loadData } from '../../../utils/loadData'
import { Comment } from '../../../typeorm/entity/Comment'
import { User } from '../../../typeorm/entity/User'
import { Blog } from '../../../typeorm/entity/Blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>,
) {
  let connection = await getConnection()

  if (!connection) {
    res.status(500).json('Database connection Error!')
    return
  }

  let { content, userId, blogId } = req.body

  let comment = new Comment(content)

  let user = await connection.manager.findOne(User, {
    where: [{ id: userId }],
  })

  if (!user) {
    res.status(500).json('Can not find user!')
    return
  }

  let blog = await connection.manager.findOne(Blog, {
    where: [{ id: blogId }],
  })

  if (!blog) {
    res.status(500).json('Can not find blog!')
    return
  }

  comment.user = user
  comment.blog = blog

  await connection.manager.save(comment)

  let data = await loadData(connection)
  res.status(200).json(data)
}
