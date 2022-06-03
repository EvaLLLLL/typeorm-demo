import React from 'react'
import { Modal as ModalAntd, ModalProps } from 'antd'
export const Modal: React.FC<
  Omit<ModalProps, 'onOk'> & { onSubmit: () => void | Promise<void> }
> = props => {
  const [loading, setLoading] = React.useState(false)
  return (
    <ModalAntd
      {...props}
      okButtonProps={{ loading }}
      onOk={async () => {
        setLoading(true)
        try {
          await props.onSubmit()
          setLoading(false)
        } catch (err) {
          console.log(err)
          setLoading(false)
        }
      }}
    >
      {props.children}
    </ModalAntd>
  )
}
