import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './page/home'
import SpentForm from './page/SpentForm'
import ChartsPage from './page/ChartsPage'


function App() {
  return (
    <Router>
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/addspent' element={<SpentForm/>}/>
          <Route path='/ChartsPage' element={<ChartsPage/>}/>

        </Routes>

    </Router>
  )
}

export default App

