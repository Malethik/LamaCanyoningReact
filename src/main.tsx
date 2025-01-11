import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Frontend";
import Home from "./pages/Home.tsx";
import ItemList from "./pages/ItemList.tsx";
import SupplierList from "./pages/SuppliersList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Home /> },
      { path: "/item", element: <ItemList /> },
      { path: "/supplier", element: <SupplierList /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
