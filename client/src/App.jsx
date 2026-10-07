import { useRoutes } from 'react-router-dom'
import Header from './components/Header'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import NotFound from './pages/NotFound'

const App = () => {
  const element = useRoutes([
    { path: '/', element: <Locations /> },
    { path: '/locations/:id', element: <LocationEvents /> },
    { path: '/events', element: <Events /> },
    { path: '*', element: <NotFound /> }
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
