import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "layout";

const Main = lazy(() => import("pages/main"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default AppRoutes