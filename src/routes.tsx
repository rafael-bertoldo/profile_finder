import { Route, Routes } from "react-router-dom"
import SearchPage from "./pages/SearchPage"
import DevPage from "./pages/DevPage"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/Profile" element={<DevPage />} />
    </Routes>
  )
}