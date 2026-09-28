import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Category from './Category.jsx'
import Trending from './Trending.jsx'
import Collection from './Collection.jsx'
import Contact from './Contact.jsx'
import Cart from './Cart.jsx'
import Login from './Login.jsx'

const page = window.location.pathname === '/category'
  ? <Category />
  : window.location.pathname === '/trending'
    ? <Trending />
    : window.location.pathname === '/collection'
      ? <Collection />
      : window.location.pathname === '/contact'
        ? <Contact />
        : window.location.pathname === '/cart'
          ? <Cart />
          : window.location.pathname === '/login'
            ? <Login />
          : <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {page}
  </StrictMode>,
)
