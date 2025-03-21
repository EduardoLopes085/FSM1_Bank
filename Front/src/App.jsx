import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './page/home'
import SpentForm from './page/SpentForm'
import ChartsPage from './page/ChartsPage'
import RegisterPages from './page/RegisterPages'
import LoginPage from './page/LoginPage'
import SpentList from './page/SpentList'


function App() {
  return (
    <Router>
        <Routes>

          <Route path='/Login' element={<LoginPage/>}/>
          <Route path='/Register' element={<RegisterPages/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/addspent' element={<SpentForm/>}/>
          <Route path='/spentList' element={<SpentList/>}/>
          <Route path='/ChartsPage' element={<ChartsPage/>}/>

        </Routes>

    </Router>
  )
}

export default App

