import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import {Login} from './Pages/Login'
import {Home} from './Pages/Home'
import {Register} from './Pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/register",
    element: <Register />
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
