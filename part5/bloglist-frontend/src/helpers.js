import toast from 'react-hot-toast'

const logEvent = (message, type = 'info') => {
  const timestamp = new Date().toLocaleString()
  console.log(`[${timestamp}] [${type}] ${message}`)
}

const notifyError = message => {
  const timestamp = new Date().toLocaleString()
  console.error(`[${timestamp}] [error] ${message}`)
  toast.error(message)
}

export { logEvent, notifyError }