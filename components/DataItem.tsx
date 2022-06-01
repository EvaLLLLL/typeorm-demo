import React from 'react'
import styles from '../styles/Home.module.css'
import JSONPretty from 'react-json-pretty'
import { Card } from 'antd'
import { Data, DataSourceType, DataType } from '../types'
import { dataTypeToLabel } from '../lib/views'
import { UserActions } from './UserActions'
import { AuthorActions } from './AuthorActions'
import { BlogActions } from './BlogActions'

export const DataItem: React.FC<{
  setData: React.Dispatch<React.SetStateAction<Data>>
  data: Data
  dataSource: DataSourceType
  dataType: DataType
}> = ({ dataSource, dataType, setData, data }) => {
  return (
    <>
      <div className={styles.dataItem}>
        <Card
          title={dataTypeToLabel(dataType)}
          size="small"
          extra={
            <>
              {dataType === DataType.User ? (
                <UserActions updateData={setData} />
              ) : null}

              {dataType === DataType.Author ? (
                <AuthorActions updateData={setData} users={data.users} />
              ) : null}

              {dataType === DataType.Blog ? (
                <BlogActions updateData={setData} authors={data.authors} />
              ) : null}
            </>
          }
        >
          <JSONPretty id="json-pretty" data={dataSource}></JSONPretty>
        </Card>
      </div>
    </>
  )
}
