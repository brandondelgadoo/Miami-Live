import { useRoutes } from 'react-router-dom'
import Header from './components/Header'
import Locations from './pages/Locations'

const App = () => {
  const element = useRoutes([
    { path: '/', element: <Locations /> }
  ])

  return (
    <div className="app">
      <Header />
      {element}
      <footer className="site-footer">
        <div className="container">Miami Live · Built for CodePath WEB103</div>
      </footer>
    </div>
  )
}

export default App
