import React from 'react'
import 'reflect-metadata'
import 'antd/dist/antd.css'
import { Instance } from 'mobx-state-tree'
import type { GetServerSideProps, NextPage } from 'next'
import { DataItems } from '../components/DataItems'
import { loadData } from '../lib/loadData'
import { getDatabaseConnection } from '../lib/getDatabaseConnection'
import { RootStore, StoreContext } from '../models'
import { Blog } from '../models/BlogStore'
import { User } from '../models/UserStore'
import { Author } from '../models/AuthorStore'
import { Comment } from '../models/CommentStore'

const Home: NextPage<{
  blogs: Instance<typeof Blog>[]
  users: Instance<typeof User>[]
  authors: Instance<typeof Author>[]
  comments: Instance<typeof Comment>[]
}> = ({ blogs, users, authors, comments }) => {
  const store = RootStore.create({
    user: { data: users },
    author: { data: authors },
    blog: { data: blogs },
    comment: { data: comments },
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
