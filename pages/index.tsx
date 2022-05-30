import type { GetServerSideProps, NextPage } from 'next'
import UAParser, { IResult } from 'ua-parser-js'
import { getDatabaseConnection } from '../lib/getDatabaseConnection'

const Home: NextPage = ({ browser }: IResult) => {
  console.log(browser)
  return (
    <div>
      <h1>浏览器：{browser.name}</h1>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let connection = await getDatabaseConnection()

  const ua = req.headers['user-agent']
  const { browser } = new UAParser(ua).getResult()

  return { props: { browser } }
}
