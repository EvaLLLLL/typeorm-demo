import React from 'react'
import axios from 'axios'
import 'reflect-metadata'
import 'antd/dist/antd.css'
import styles from '../styles/Home.module.css'
import type { GetServerSideProps, NextPage } from 'next'
import { getDatabaseConnection } from '../lib/getDatabaseConnection'
import { Blog } from '../src/entity/Blog'
import { User } from '../src/entity/User'
import { Author } from '../src/entity/Author'
import { Comment } from '../src/entity/Comment'
import { parseData } from '../lib/utils'
import { ActionItem } from '../components/ActionItem'
import { DataItem } from '../components/DataItem'
import { dataTypeToKey } from '../lib/views'
import { ActionType, DataType } from '../types'

const Home: NextPage = ({
  blogs,
  users,
  authors,
  comments,
}: {
  blogs: Blog[]
  users: User[]
  authors: Author[]
  comments: Comment[]
}) => {
  const [data, setData] = React.useState({
    blogs,
    users,
    authors,
    comments,
  })

  const [actionType, setActionType] = React.useState<{
    [key: string]: ActionType
  }>()

  const updateData = (type: DataType, sourceData?: any) => {
    const key = dataTypeToKey(type)
    setData({
      ...data,
      [key]: sourceData?.[key],
    })
  }

  const [addType, setAddType] = React.useState<DataType>()
  const [delType, setDelType] = React.useState<DataType>()
  const [updateType, setUpdateType] = React.useState<DataType>()
  const add = async (type: DataType) => {
    let { data: sourceData } = await axios.post('/api/add', type)
    updateData(type, sourceData)
  }

  const del = async (type: DataType) => {
    let { data: sourceData } = await axios.post('/api/del', type)
    updateData(type, sourceData)
  }

  const update = async (type: DataType) => {
    let { data: sourceData } = await axios.post('/api/update', type)
    updateData(type, sourceData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <ActionItem
          key={ActionType.Add}
          actionType={ActionType.Add}
          value={addType}
          onChange={setAddType}
          onButtonClick={() => add(addType)}
        />

        <ActionItem
          key={ActionType.Del}
          actionType={ActionType.Del}
          value={delType}
          onChange={setDelType}
          onButtonClick={() => del(addType)}
        />

        <ActionItem
          key={ActionType.Update}
          actionType={ActionType.Update}
          value={updateType}
          onChange={setUpdateType}
          onButtonClick={() => update(addType)}
        />
      </div>

      <div className={styles.dataContainer}>
        {[DataType.User, DataType.Blog, DataType.Author, DataType.Comment].map(
          type => (
            <DataItem
              key={type}
              dataType={type}
              dataSource={data[dataTypeToKey(type)]}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let connection = await getDatabaseConnection()
  const blogsData = await connection.manager.find(Blog, {
    relations: ['authors'],
    order: { updated_at: 1 },
  })
  const usersData = await connection.manager.find(User, { order: { id: -1 } })
  const authorsData = await connection.manager.find(Author, {
    relations: ['blogs'],
    order: { id: -1 },
  })
  const commentsData = await connection.manager.find(Comment, {
    relations: ['user', 'blog'],
    order: { id: -1 },
  })

  return {
    props: {
      blogs: parseData(blogsData),
      users: parseData(usersData),
      authors: parseData(authorsData),
      comments: parseData(commentsData),
    },
  }
}
