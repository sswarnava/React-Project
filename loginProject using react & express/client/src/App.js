import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/loginAndReg/Login";
import Register from "./components/loginAndReg/Register";
import HomePage from "./components/HomePage/HomePage";
import Starter from "./components/startingPage/Starter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Starter />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomePage />,
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
