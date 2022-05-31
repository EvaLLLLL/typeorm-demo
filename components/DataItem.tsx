import React from 'react'
import styles from '../styles/Home.module.css'
import { List } from 'antd'
import { DataSourceType, DataType } from '../types'
import { dataTypeToLabel } from '../lib/views'

export const DataItem: React.FC<{
  dataSource: DataSourceType
  dataType: DataType
}> = ({ dataSource, dataType }) => {
  return (
    <div className={styles.dataItem}>
      <List
        header={dataTypeToLabel(dataType)}
        size="small"
        bordered
        dataSource={dataSource as any}
        renderItem={data => (
          <List.Item>
            <code>{JSON.stringify(data)}</code>
          </List.Item>
        )}
      />
    </div>
  )
}
