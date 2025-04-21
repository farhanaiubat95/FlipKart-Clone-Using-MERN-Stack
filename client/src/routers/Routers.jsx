import React from 'react'
import { Routes, Route } from "react-router-dom";
// Components
import Home from '../pages/Home'
import Login from '../pages/Login'
import DetailView from '../components/details/DetailView';
import Cart from '../components/cart/Cart';
import Payment from '../components/payment/PaymentNow';


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<DetailView />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  )
}

export default Routers
