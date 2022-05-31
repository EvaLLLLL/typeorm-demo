import styles from '../styles/Home.module.css'
import { Button, message, Select } from 'antd'
import React from 'react'
import { ActionType, DataType } from '../types'
import { actionTypeToLabel, dataTypeToLabel } from '../lib/views'

export const ActionItem: React.FC<{
  actionType: ActionType
  value: DataType
  onChange: (val: DataType) => void
  onButtonClick: () => void
}> = ({ actionType, value, onChange, onButtonClick }) => {
  return (
    <div className={styles.actionItem}>
      <Select
        style={{ marginRight: 10, width: 200 }}
        value={value}
        onChange={onChange}
        placeholder={`选择一个想要${actionTypeToLabel(actionType)}的类型`}
        options={[
          { label: dataTypeToLabel(DataType.User), value: DataType.User },
          { label: dataTypeToLabel(DataType.Blog), value: DataType.Blog },
          {
            label: dataTypeToLabel(DataType.Comment),
            value: DataType.Comment,
          },
          { label: dataTypeToLabel(DataType.Author), value: DataType.Author },
        ]}
      />

      <Button
        style={{ marginRight: 36 }}
        onClick={() => {
          if (!value) {
            message.error('请选择类型')
            return
          }

          onButtonClick()
        }}
      >
        {actionType}
      </Button>
    </div>
  )
}
