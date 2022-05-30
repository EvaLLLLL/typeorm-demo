import 'reflect-metadata'
import 'antd/dist/antd.css'
import type { GetServerSideProps, NextPage } from 'next'
import { getDatabaseConnection } from '../lib/getDatabaseConnection'
import { Blog } from '../src/entity/Blog'
import styles from '../styles/Home.module.css'
import { User } from '../src/entity/User'
import { parseData } from '../lib/utils'
import { Button, List, Select } from 'antd'
import React from 'react'
import axios from 'axios'

const Home: NextPage = ({
  blogs,
  users: originUsers,
}: {
  blogs: Blog[]
  users: User[]
}) => {
  const [addType, setAddType] = React.useState<'user'>()
  const [delType, setDelType] = React.useState<'user'>()
  const [users, setUsers] = React.useState(originUsers)
  const add = async (type: 'user') => {
    let { data } = await axios.post('/api/add', type)
    setUsers(data?.users)
  }

  const del = async (type: 'user') => {
    let { data } = await axios.post('/api/del', type)
    setUsers(data?.users)
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <Select
            style={{ marginRight: 10, width: 200 }}
            value={addType}
            placeholder="选择一个想增加的类型"
            options={[{ label: 'User', value: 'user' }]}
            onChange={val => setAddType(val)}
          />

          <Button onClick={() => add(addType)}>add</Button>
        </div>
        <div className={styles.actionItem}>
          <Select
            style={{ marginRight: 10, width: 200 }}
            value={delType}
            placeholder="选择一个想删除的类型"
            options={[{ label: 'User', value: 'user' }]}
            onChange={val => setDelType(val)}
          />

          <Button onClick={() => del(delType)}>del</Button>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.users}>
          <List
            header="users"
            size="small"
            bordered
            dataSource={users}
            renderItem={user => (
              <List.Item>
                <code>{JSON.stringify(user)}</code>
              </List.Item>
            )}
          />
        </div>

        <div className={styles.blogs}>
          <List
            header="blogs"
            bordered
            dataSource={blogs}
            renderItem={blog => (
              <List.Item>
                <code>{JSON.stringify(blog)}</code>
              </List.Item>
            )}
          />
        </div>
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

  return { props: { blogs: parseData(blogsData), users: parseData(usersData) } }
}
