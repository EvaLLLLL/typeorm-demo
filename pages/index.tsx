import 'reflect-metadata'
import 'antd/dist/antd.css'
import type { GetServerSideProps, NextPage } from 'next'
import { getDatabaseConnection } from '../lib/getDatabaseConnection'
import { Blog } from '../src/entity/Blog'
import styles from '../styles/Home.module.css'
import { User } from '../src/entity/User'
import { parseData } from '../lib/utils'
import { Button, Select } from 'antd'
import React from 'react'
import axios from 'axios'

const Home: NextPage = ({
  blogs,
  users: originUsers,
}: {
  blogs: Blog[]
  users: User[]
}) => {
  const [type, setType] = React.useState<'user'>()
  const [users, setUsers] = React.useState(originUsers)
  const submit = async (type: 'user') => {
    let { data } = await axios.post('/api/add', type)
    setUsers(data?.users)
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <Select
            style={{ marginRight: 10 }}
            value={type}
            placeholder="选择一个想增加的类型"
            options={[{ label: 'User', value: 'user' }]}
            onChange={val => setType(val)}
          />

          <Button onClick={() => submit(type)}>submit</Button>
        </div>
      </div>

      <div className={styles.dataContainer}>
        <div className={styles.users}>
          <h2>users: </h2>

          {users.map(user => (
            <div key={user.id}>
              name: {user.name}, id: {user.id}
            </div>
          ))}
        </div>

        <div className={styles.blogs}>
          <h2>blogs: </h2>

          {blogs.map(blog => (
            <div key={blog.id}>
              title: {blog.title}, content: {blog.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let connection = await getDatabaseConnection()
  const blogsData = await connection.manager.find(Blog)
  const usersData = await connection.manager.find(User)

  return { props: { blogs: parseData(blogsData), users: parseData(usersData) } }
}
