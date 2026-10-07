import { useRoutes } from 'react-router-dom'

const App = () => {
  const element = useRoutes([
    { path: '/', element: <h1>Miami Live</h1> }
  ])

  return <div className="app">{element}</div>
}

export default App
