import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import ItemList from "./pages/ItemList.tsx";
import SupplierList from "./pages/SuppliersList.tsx";
import Error404 from "./pages/Error404.tsx";
import OrderList from "./pages/OrderList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Home /> },
      { path: "/item", element: <ItemList /> },
      { path: "/supplier", element: <SupplierList /> },
      { path: "/order", element: <OrderList /> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
