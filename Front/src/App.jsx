import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './page/home'
import SpentForm from './page/SpentForm'
import ChartsPage from './page/ChartsPage'
import RegisterPages from './page/RegisterPages'
import LoginPage from './page/LoginPage'


function App() {
  return (
    <Router>
        <Routes>

          <Route path='/Login' element={<LoginPage/>}/>
          <Route path='/Register' element={<RegisterPages/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/addspent' element={<SpentForm/>}/>
          <Route path='/ChartsPage' element={<ChartsPage/>}/>

        </Routes>

    </Router>
  )
}

export default App

