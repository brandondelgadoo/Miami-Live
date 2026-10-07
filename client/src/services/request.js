// Small fetch wrapper: returns parsed JSON or throws an Error with the API's message
const request = async (url) => {
  const response = await fetch(url)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(data?.error || `Request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }

  return data
}

export default request
