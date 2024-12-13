import React from "react";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Footer from './components/footer/footer.component'

import { GlobalCss } from "./globar.css";

const Layout = () => {
  return (
    // <div className="screen">
      <GlobalCss>
        <Navigation />
        <Outlet />
        <Footer/>
      </GlobalCss>
    // </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Authentication />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
