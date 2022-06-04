import React from 'react'
import 'reflect-metadata'
import 'antd/dist/antd.css'
import { Instance } from 'mobx-state-tree'
import type { GetServerSideProps, NextPage } from 'next'
import { DataItems } from '../components/DataItems'
import { loadData } from '../utils/loadData'
import { getConnection } from '../utils/getConnection'
import { RootStore, StoreContext } from '../store'
import { Blog } from '../store/BlogStore'
import { User } from '../store/UserStore'
import { Author } from '../store/AuthorStore'
import { Comment } from '../store/CommentStore'

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
  const connection = await getConnection()
  const data = await loadData(connection)

  return {
    props: data,
  }
}
