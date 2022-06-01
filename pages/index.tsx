import React from 'react'
import 'reflect-metadata'
import 'antd/dist/antd.css'
import styles from '../styles/Home.module.css'
import type { GetServerSideProps, NextPage } from 'next'
import { Blog } from '../src/entity/Blog'
import { User } from '../src/entity/User'
import { Author } from '../src/entity/Author'
import { Comment } from '../src/entity/Comment'
import { DataItem } from '../components/DataItem'
import { dataTypeToKey } from '../lib/views'
import { DataType } from '../types'
import { loadData } from '../lib/loadData'
import { getDatabaseConnection } from '../lib/getDatabaseConnection'

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

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        {[DataType.User, DataType.Author, DataType.Blog, DataType.Comment].map(
          type => (
            <DataItem
              key={type}
              data={data}
              dataType={type}
              setData={setData}
              dataSource={data[dataTypeToKey(type)]}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDatabaseConnection()
  const data = await loadData(connection)

  return {
    props: data,
  }
}
