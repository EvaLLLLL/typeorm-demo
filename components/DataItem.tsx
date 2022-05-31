import React from 'react'
import styles from '../styles/Home.module.css'
import { Card } from 'antd'
import { DataSourceType, DataType } from '../types'
import { dataTypeToLabel } from '../lib/views'
import JSONPretty from 'react-json-pretty'

export const DataItem: React.FC<{
  dataSource: DataSourceType
  dataType: DataType
}> = ({ dataSource, dataType }) => {
  return (
    <div className={styles.dataItem}>
      <Card title={dataTypeToLabel(dataType)} size="small">
        <JSONPretty id="json-pretty" data={dataSource}></JSONPretty>
      </Card>
    </div>
  )
}
