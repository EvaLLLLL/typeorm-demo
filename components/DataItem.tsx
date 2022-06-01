import React from 'react'
import styles from '../styles/Home.module.css'
import JSONPretty from 'react-json-pretty'
import { Card } from 'antd'
import { Data, DataSourceType, DataType } from '../types'
import { dataTypeToLabel } from '../lib/views'
import { UserActions } from './UserActions'

export const DataItem: React.FC<{
  setData: React.Dispatch<React.SetStateAction<Data>>
  dataSource: DataSourceType
  dataType: DataType
}> = ({ dataSource, dataType, setData }) => {
  return (
    <>
      <div className={styles.dataItem}>
        <Card
          title={dataTypeToLabel(dataType)}
          size="small"
          extra={
            <>
              <UserActions updateData={setData} />
            </>
          }
        >
          <JSONPretty id="json-pretty" data={dataSource}></JSONPretty>
        </Card>
      </div>
    </>
  )
}
