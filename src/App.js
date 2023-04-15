import { Route, Routes, BrowserRouter } from "react-router-dom"

import Register from "./pages/user/register"
import Login from "./pages/user/login"
import ReadAll from "./pages/item/readAll"
import ReadSingle from "./pages/item/readSingle"
import CreateItem from "./pages/item/create"
import UpdateItem from "./pages/item/update"
import DeleteItem from "./pages/item/delete"

import Header from "./components/header"
import Footer from "./components/footer"

import "./App.css"

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/" element={<ReadAll />} />
          <Route path="/item/:id" element={<ReadSingle />} />
          <Route path="/item/create" element={<CreateItem />} />
          <Route path="/item/update/:id" element={<UpdateItem />} />
          <Route path="/item/delete/:id" element={<DeleteItem />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}


export default App