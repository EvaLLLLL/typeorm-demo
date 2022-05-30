import { createConnection, getConnectionManager } from 'typeorm'

const connectionPromise = (() => {
  console.log('创建 connection')
  const manager = getConnectionManager()

  if (!manager.has('default')) {
    return createConnection()
  }

  const currentConnection = manager.get('default')

  if (currentConnection.isConnected) {
    return currentConnection
  } else {
    return createConnection()
  }
})()

export const getDatabaseConnection = () => {
  return connectionPromise
}
