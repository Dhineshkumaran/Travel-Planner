import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Loginhome from './../pages/Loginhome'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import About from '../pages/About'
import Admin from '../pages/Admin'
const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/about' element={<About/>}/>
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/loginhome' element={<Loginhome/>} />
         <Route path='/admin' element={<Admin/>}/>
         <Route path='/register' element={<Register/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
      </Routes>
   )
}

export default Routers