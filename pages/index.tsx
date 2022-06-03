import React from 'react'
import 'reflect-metadata'
import 'antd/dist/antd.css'
import type { GetServerSideProps, NextPage } from 'next'
import { Blog } from '../src/entity/Blog'
import { User } from '../src/entity/User'
import { Author } from '../src/entity/Author'
import { Comment } from '../src/entity/Comment'
import { DataItems } from '../components/DataItems'
import { loadData } from '../lib/loadData'
import { getDatabaseConnection } from '../lib/getDatabaseConnection'
import { RootStore, StoreContext } from '../models'

const Home: NextPage<{
  blogs: Blog[]
  users: User[]
  authors: Author[]
  comments: Comment[]
}> = ({ blogs, users, authors, comments }) => {
  const store = RootStore.create({
    user: { data: users },
    author: { data: authors },
  })

  return (
    <StoreContext.Provider value={store}>
      <DataItems />
    </StoreContext.Provider>
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
