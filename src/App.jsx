import { HomePage } from "./pages/home/HomePage"
import { Routes, Route } from "react-router"
import { CheckoutPage } from "./pages/checkout/CheckoutPage"
import { OrderPage } from "./pages/order/OrderPage"
import axios from "axios"
import { useEffect, useState } from "react"
function App() {
  const [cart, setCart] = useState([])
  const fetchCartData = async() =>{
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data)
  }
  useEffect(() => {
    fetchCartData()
  }, [])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} fetchCartData={fetchCartData} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrderPage cart={cart} />} />
    </Routes>
  )
}

export default App
