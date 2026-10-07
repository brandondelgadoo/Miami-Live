import { useEffect } from 'react'
import { ErrorMessage } from '../components/Status'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Miami Live · Page not found'
  }, [])

  return (
    <main className="container page">
      <ErrorMessage title="404: This page isn't on the setlist" message="Let's get you back to the map." showHomeLink />
    </main>
  )
}

export default NotFound
