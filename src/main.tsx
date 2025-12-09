import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Layout from './Layout'
import App from './App'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'element={<Layout/>}> 
      <Route path='/home' element/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
