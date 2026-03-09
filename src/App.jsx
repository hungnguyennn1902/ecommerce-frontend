import { HomePage } from "./pages/HomePage"
import { Routes, Route } from "react-router"
import { CheckoutPage } from "./pages/CheckoutPage"
import { OrderPage } from "./pages/OrderPage"
function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrderPage />} />
    </Routes>
  )
}

export default App
